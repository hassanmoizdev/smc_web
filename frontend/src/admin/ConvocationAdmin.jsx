import React, { useState, useEffect, useMemo } from "react";
import { CONTENT_API, REQUEST_CONFIG, resolveMediaUrl, isPdfUrl } from "../api";
import {
    GraduationCap,
    Eye,
    X,
    Download,
    Search,
    CheckCircle2,
    XCircle,
    Loader2,
    User,
    Phone,
    Mail,
    BookOpen,
    Award,
    Briefcase,
    Image as ImageIcon,
    Users,
    RefreshCw,
    Trash2,
    MessageCircle,
    Clock,
    Receipt,
    ShieldCheck,
} from "lucide-react";

const MAX_MEMBERS = 200;

const getImageUrl = resolveMediaUrl;

const badge = (value, yesColor = "bg-green-100 text-green-700", noColor = "bg-red-100 text-red-700") =>
    value === "Yes" ? (
        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${yesColor}`}>
            <CheckCircle2 size={12} /> Yes
        </span>
    ) : (
        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${noColor}`}>
            <XCircle size={12} /> No
        </span>
    );

const paymentBadge = (status) => {
    if (status === "verified") {
        return (
            <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                <ShieldCheck size={12} /> Verified
            </span>
        );
    }
    if (status === "rejected") {
        return (
            <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-red-100 text-red-700 border border-red-200">
                <XCircle size={12} /> Rejected
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
            <Clock size={12} /> Pending
        </span>
    );
};

const formatWhatsAppPhone = (whatsapp) => {
    if (!whatsapp) return "";
    return whatsapp.replace(/\D/g, "");
};

const buildConvocationWhatsAppMessage = (record) => {
    const num = record.convocationNumber;
    return (
        `Assalam-o-Alaikum ${record.name},\n\n` +
        `Congratulations! Your SMC Convocation registration has been verified.\n\n` +
        `Your Convocation Number: *${num}*\n\n` +
        `We look forward to welcoming you at the convocation ceremony.\n\n` +
        `Best Regards,\nSMC Administration`
    );
};

function MediaPreview({ url, alt, imgClassName = "max-h-48 rounded-xl border border-gray-200 shadow" }) {
    const [err, setErr] = useState(false);
    const src = getImageUrl(url);

    if (!url) {
        return <p className="text-sm text-gray-400 italic">Not uploaded</p>;
    }
    if (isPdfUrl(url)) {
        return (
            <a href={src} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#800000] font-semibold text-sm">
                <Receipt size={16} />
                Open {alt} (PDF)
            </a>
        );
    }
    if (err) {
        return (
            <a href={src} target="_blank" rel="noreferrer" className="text-[#800000] font-semibold text-sm underline">
                Open {alt} in new tab
            </a>
        );
    }
    return (
        <a href={src} target="_blank" rel="noreferrer">
            <img
                src={src}
                alt={alt}
                onError={() => setErr(true)}
                className={`${imgClassName} hover:scale-[1.02] transition-transform cursor-pointer`}
            />
        </a>
    );
}

const openWhatsAppChat = (record) => {
    const phone = formatWhatsAppPhone(record.whatsapp);
    if (!phone) {
        alert("WhatsApp number is missing for this registration.");
        return;
    }
    const text = buildConvocationWhatsAppMessage(record);
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
};

const downloadCSV = (data) => {
    const headers = [
        "Convocation #", "Name", "Father Name", "Email", "WhatsApp", "Transaction ID",
        "Payment Status", "College ID", "Department", "Passing Year", "Registered At",
    ];
    const rows = data.map((r) => [
        r.convocationNumber ?? "",
        r.name, r.fatherName, r.email, r.whatsapp, r.transactionId,
        r.paymentStatus, r.collegeId, r.department, r.passingYear,
        new Date(r.createdAt).toLocaleString(),
    ]);
    const csv = [headers, ...rows].map((row) => row.map((v) => `"${v ?? ""}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `convocation_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
};

function DetailModal({ record, onClose, onVerify, onReject, verifying }) {

    const distinctionYears = record.distinctionFiles
        ? Object.entries(record.distinctionFiles).filter(([, v]) => v)
        : [];
    const positionYears = record.positions
        ? Object.entries(record.positions).filter(([, v]) => v)
        : [];

    const canWhatsApp =
        record.paymentStatus === "verified" && record.convocationNumber;

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div
                className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 z-10 flex items-center justify-between bg-[#800000] text-white px-8 py-5 rounded-t-3xl">
                    <div className="flex items-center gap-3">
                        <GraduationCap size={26} />
                        <div>
                            <h2 className="text-xl font-black tracking-tight">{record.name}</h2>
                            <p className="text-white/70 text-sm">
                                {record.convocationNumber
                                    ? `Convocation #${record.convocationNumber}`
                                    : record.department || "—"}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-xl transition-all">
                        <X size={22} />
                    </button>
                </div>

                <div className="p-8 space-y-8">
                    <div className="flex flex-wrap justify-center gap-3">
                        {paymentBadge(record.paymentStatus)}
                        {record.convocationNumber && (
                            <span className="inline-flex items-center gap-1 text-sm font-black px-4 py-1.5 rounded-full bg-[#800000] text-white">
                                <GraduationCap size={14} /> #{record.convocationNumber}
                            </span>
                        )}
                    </div>

                    <Section title="Payment Details" icon={<Receipt size={18} />}>
                        <Grid>
                            <Field label="Transaction ID" value={record.transactionId} />
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Payment Status</span>
                                {paymentBadge(record.paymentStatus)}
                            </div>
                        </Grid>
                        <div className="mt-4">
                            <p className="text-xs font-bold text-gray-500 uppercase mb-2">Payment Slip</p>
                            <MediaPreview url={record.paymentSlip} alt="payment slip" />
                        </div>
                        <div className="flex flex-wrap gap-3 mt-6">
                            {record.paymentStatus === "pending" && (
                                <>
                                    <button
                                        onClick={() => onVerify(record._id)}
                                        disabled={verifying}
                                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm disabled:opacity-50"
                                    >
                                        {verifying ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
                                        Verify Payment
                                    </button>
                                    <button
                                        onClick={() => onReject(record._id)}
                                        disabled={verifying}
                                        className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 px-5 py-2.5 rounded-xl font-bold text-sm disabled:opacity-50"
                                    >
                                        <XCircle size={16} />
                                        Reject
                                    </button>
                                </>
                            )}
                            {canWhatsApp && (
                                <button
                                    onClick={() => openWhatsAppChat(record)}
                                    className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white px-5 py-2.5 rounded-xl font-bold text-sm"
                                >
                                    <MessageCircle size={16} />
                                    Send WhatsApp Message
                                </button>
                            )}
                        </div>
                    </Section>

                    <div className="flex flex-col items-center gap-2">
                        <p className="text-xs font-bold text-gray-500 uppercase">Profile Photo</p>
                        {record.picture ? (
                            <MediaPreview
                                url={record.picture}
                                alt={record.name}
                                imgClassName="w-40 h-40 object-cover rounded-2xl shadow-lg border-4 border-[#800000]/20"
                            />
                        ) : (
                            <div className="w-40 h-40 rounded-2xl bg-[#fff5f5] border-2 border-dashed border-[#800000]/30 flex flex-col items-center justify-center text-[#800000]/40">
                                <ImageIcon size={40} />
                                <span className="text-xs mt-2">No Photo</span>
                            </div>
                        )}
                    </div>

                    <Section title="Personal Information" icon={<User size={18} />}>
                        <Grid>
                            <Field label="Full Name" value={record.name} />
                            <Field label="Father's Name" value={record.fatherName} />
                            <Field label="Email" value={record.email} icon={<Mail size={14} />} />
                            <Field label="WhatsApp" value={record.whatsapp} icon={<Phone size={14} />} />
                        </Grid>
                    </Section>

                    <Section title="Academic Information" icon={<BookOpen size={18} />}>
                        <Grid>
                            <Field label="College ID" value={record.collegeId} />
                            <Field label="UHS Reg #" value={record.uhsReg} />
                            <Field label="PMD Reg #" value={record.pmdReg} />
                            <Field label="Academic Session" value={record.academicSession} />
                            <Field label="Passing Year" value={record.passingYear} />
                            <Field label="Department" value={record.department} />
                        </Grid>
                    </Section>

                    <Section title="Current Status" icon={<Briefcase size={18} />}>
                        <Grid>
                            <Field label="Current Position" value={record.currentPosition} />
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Distinction</span>
                                {badge(record.distinction)}
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Position Holder</span>
                                {badge(record.positionHolder)}
                            </div>
                        </Grid>
                    </Section>

                    {positionYears.length > 0 && (
                        <Section title="Position Details" icon={<Award size={18} />}>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {positionYears.map(([yr, val]) => (
                                    <div key={yr} className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                                        <p className="text-xs font-bold text-amber-600 uppercase mb-1">{yr.replace("year", "Year ")}</p>
                                        <p className="text-sm font-semibold text-gray-800">{val}</p>
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}

                    {distinctionYears.length > 0 && (
                        <Section title="Distinction Certificates" icon={<Award size={18} />}>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {distinctionYears.map(([yr, url]) => (
                                    <DistinctionImage key={yr} year={yr} url={url} />
                                ))}
                            </div>
                        </Section>
                    )}

                    <div className="text-center text-xs text-gray-400">
                        Registered on {new Date(record.createdAt).toLocaleString("en-PK", { dateStyle: "long", timeStyle: "short" })}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Section({ title, icon, children }) {
    return (
        <div>
            <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-[#fff5f5] text-[#800000] rounded-lg">{icon}</div>
                <h3 className="text-base font-black text-gray-800 tracking-tight">{title}</h3>
            </div>
            {children}
        </div>
    );
}

function Grid({ children }) {
    return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{children}</div>;
}

function Field({ label, value, icon }) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</span>
            <span className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                {icon && <span className="text-[#800000]">{icon}</span>}
                {value || <span className="text-gray-300 italic">—</span>}
            </span>
        </div>
    );
}

function DistinctionImage({ year, url }) {
    const [err, setErr] = useState(false);
    return (
        <div className="flex flex-col items-center gap-2">
            <p className="text-xs font-bold text-gray-500 uppercase">{year.replace("year", "Year ")}</p>
            {!err ? (
                <a href={getImageUrl(url)} target="_blank" rel="noreferrer">
                    <img
                        src={getImageUrl(url)}
                        alt={year}
                        onError={() => setErr(true)}
                        className="w-full h-28 object-cover rounded-xl shadow border border-gray-200 hover:scale-105 transition-transform cursor-pointer"
                    />
                </a>
            ) : (
                <div className="w-full h-28 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                    <ImageIcon size={24} />
                </div>
            )}
        </div>
    );
}

function ConvocationAdmin() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filterPayment, setFilterPayment] = useState("all");
    const [filterYear, setFilterYear] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [verifying, setVerifying] = useState(false);
    const PAGE_SIZE = 30;
    const [selected, setSelected] = useState(null);

    const fetchRecords = async () => {
        setLoading(true);
        try {
            const res = await fetch(CONTENT_API.CONVOCATION);
            const data = await res.json();
            setRecords(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error fetching convocation data:", err);
            setRecords([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, filterPayment, filterYear]);

    const handleVerify = async (id) => {
        if (!window.confirm("Verify this payment and assign a convocation number (1–200)?")) return;
        setVerifying(true);
        try {
            const res = await fetch(`${CONTENT_API.CONVOCATION}/${id}/verify`, { method: "PATCH" });
            const data = await res.json();
            if (!res.ok) {
                alert(data.error || "Verification failed");
                return;
            }
            await fetchRecords();
            if (selected?._id === id) {
                setSelected(data.record);
            }
            alert(data.message || "Verified successfully");
        } catch (err) {
            console.error("Verify error:", err);
            alert("Failed to verify payment");
        } finally {
            setVerifying(false);
        }
    };

    const handleReject = async (id) => {
        if (!window.confirm("Reject this payment?")) return;
        setVerifying(true);
        try {
            const res = await fetch(`${CONTENT_API.CONVOCATION}/${id}/reject`, { method: "PATCH" });
            const data = await res.json();
            if (!res.ok) {
                alert(data.error || "Rejection failed");
                return;
            }
            await fetchRecords();
            if (selected?._id === id) setSelected(data.record);
        } catch (err) {
            console.error("Reject error:", err);
            alert("Failed to reject payment");
        } finally {
            setVerifying(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this registration?")) return;
        try {
            await fetch(`${CONTENT_API.CONVOCATION}/${id}`, REQUEST_CONFIG.DELETE);
            fetchRecords();
            if (selected?._id === id) setSelected(null);
        } catch (err) {
            console.error("Error deleting registration:", err);
        }
    };

    const filtered = useMemo(() => {
        return records.filter((r) => {
            const matchPayment = filterPayment === "all" || r.paymentStatus === filterPayment;
            const matchYear =
                filterYear === "all" ||
                (r.passingYear && String(r.passingYear) === String(filterYear));
            const q = search.toLowerCase();
            const matchSearch =
                !q ||
                (r.name || "").toLowerCase().includes(q) ||
                (r.email || "").toLowerCase().includes(q) ||
                (r.department || "").toLowerCase().includes(q) ||
                (r.collegeId || "").toLowerCase().includes(q) ||
                (r.transactionId || "").toLowerCase().includes(q) ||
                String(r.convocationNumber || "").includes(q);
            return matchPayment && matchYear && matchSearch;
        });
    }, [records, search, filterPayment, filterYear]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paginated = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        return filtered.slice(start, start + PAGE_SIZE);
    }, [filtered, currentPage]);

    const pending = records.filter((r) => r.paymentStatus === "pending").length;
    const verified = records.filter((r) => r.paymentStatus === "verified").length;

    return (
        <div className="max-w-[1200px] mx-auto my-10 px-4">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#fff5f5] text-[#800000] rounded-2xl">
                        <GraduationCap size={36} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-[#800000] tracking-tight">Convocation Registrations</h2>
                        <p className="text-gray-500 font-medium">Verify payments, assign numbers (max {MAX_MEMBERS}), send WhatsApp invites</p>
                    </div>
                </div>
                <button
                    onClick={fetchRecords}
                    className="flex items-center gap-2 text-[#800000] border border-[#800000]/30 hover:bg-[#fff5f5] py-2.5 px-5 rounded-xl font-bold transition-all"
                >
                    <RefreshCw size={16} />
                    Refresh
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                <StatCard
                    label="Total Registrations"
                    value={records.length}
                    icon={<Users size={24} />}
                    color="bg-[#800000]"
                    onClick={() => setFilterPayment("all")}
                    active={filterPayment === "all"}
                />
                <StatCard
                    label="Pending Verification"
                    value={pending}
                    icon={<Clock size={24} />}
                    color="bg-amber-500"
                    onClick={() => setFilterPayment("pending")}
                    active={filterPayment === "pending"}
                />
                <StatCard
                    label={`Verified (${verified}/${MAX_MEMBERS})`}
                    value={verified}
                    icon={<ShieldCheck size={24} />}
                    color="bg-emerald-600"
                    onClick={() => setFilterPayment("verified")}
                    active={filterPayment === "verified"}
                />
            </div>

            <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
                <div className="relative flex-1 min-w-[220px]">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search name, email, transaction ID, convocation #…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#800000] outline-none text-sm bg-white shadow-sm"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-600 whitespace-nowrap">Payment</label>
                    <select
                        value={filterPayment}
                        onChange={(e) => setFilterPayment(e.target.value)}
                        className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#800000]"
                    >
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="verified">Verified</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-600 whitespace-nowrap">Passing Year</label>
                    <select
                        value={filterYear}
                        onChange={(e) => setFilterYear(e.target.value)}
                        className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#800000]"
                    >
                        <option value="all">All</option>
                        {Array.from({ length: 2025 - 2017 + 1 }).map((_, idx) => {
                            const year = 2017 + idx;
                            return (
                                <option key={year} value={String(year)}>
                                    {year}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <button
                    onClick={() => downloadCSV(filtered)}
                    className="flex items-center gap-2 py-2.5 px-4 rounded-xl font-bold text-sm bg-[#800000] hover:bg-[#600000] text-white transition-all"
                >
                    <Download size={15} />
                    Download CSV
                </button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center p-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <Loader2 size={40} className="text-[#800000] animate-spin" />
                </div>
            ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 text-gray-400">
                    <GraduationCap size={48} className="mb-3" />
                    <p className="font-bold text-lg">No records found</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-[#800000] text-white text-left">
                                    <th className="px-4 py-4 font-bold whitespace-nowrap">#</th>
                                    <th className="px-4 py-4 font-bold whitespace-nowrap">Photo</th>
                                    <th className="px-4 py-4 font-bold whitespace-nowrap">Slip</th>
                                    <th className="px-4 py-4 font-bold whitespace-nowrap">Conv. #</th>
                                    <th className="px-4 py-4 font-bold whitespace-nowrap">Name</th>
                                    <th className="px-4 py-4 font-bold whitespace-nowrap">Transaction ID</th>
                                    <th className="px-4 py-4 font-bold whitespace-nowrap">Payment</th>
                                    <th className="px-4 py-4 font-bold whitespace-nowrap">Department</th>
                                    <th className="px-4 py-4 font-bold whitespace-nowrap">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginated.map((r, idx) => (
                                    <TableRow
                                        key={r._id}
                                        record={r}
                                        index={(currentPage - 1) * PAGE_SIZE + idx + 1}
                                        onView={() => setSelected(r)}
                                        onVerify={() => handleVerify(r._id)}
                                        onReject={() => handleReject(r._id)}
                                        onDelete={() => handleDelete(r._id)}
                                        verifying={verifying}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-t border-gray-100 text-sm text-gray-500 font-medium">
                        <div>
                            Showing {(currentPage - 1) * PAGE_SIZE + 1} - {Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length} (total {records.length})
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${currentPage === 1 ? "text-gray-300 border-gray-100 cursor-not-allowed" : "text-[#800000] border-[#800000]/30 hover:bg-[#fff5f5]"}`}
                            >
                                Prev
                            </button>
                            <span className="text-xs">Page {currentPage} of {totalPages}</span>
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${currentPage === totalPages ? "text-gray-300 border-gray-100 cursor-not-allowed" : "text-[#800000] border-[#800000]/30 hover:bg-[#fff5f5]"}`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {selected && (
                <DetailModal
                    record={selected}
                    onClose={() => setSelected(null)}
                    onVerify={handleVerify}
                    onReject={handleReject}
                    verifying={verifying}
                />
            )}
        </div>
    );
}

function StatCard({ label, value, icon, color, onClick, active }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-4 p-5 rounded-2xl text-left transition-all cursor-pointer shadow-sm border-2 ${active ? "border-[#800000] shadow-lg scale-[1.02]" : "border-transparent hover:shadow-md"} bg-white`}
        >
            <div className={`p-3 rounded-xl text-white ${color}`}>{icon}</div>
            <div>
                <p className="text-2xl font-black text-gray-800">{value}</p>
                <p className="text-sm text-gray-500 font-medium">{label}</p>
            </div>
        </button>
    );
}

function ThumbCell({ url, label }) {
    const [err, setErr] = useState(false);
    const src = getImageUrl(url);
    if (!url) {
        return (
            <span className="text-xs text-gray-300" title={`No ${label}`}>
                —
            </span>
        );
    }
    if (isPdfUrl(url) || err) {
        return (
            <a href={src} target="_blank" rel="noreferrer" title={`View ${label}`} className="text-[#800000]">
                <Receipt size={20} />
            </a>
        );
    }
    return (
        <a href={src} target="_blank" rel="noreferrer" title={`View ${label}`}>
            <img
                src={src}
                alt={label}
                onError={() => setErr(true)}
                className="w-10 h-10 rounded-lg object-cover border border-[#800000]/20"
            />
        </a>
    );
}

function TableRow({ record, index, onView, onVerify, onReject, onDelete, verifying }) {
    const canWhatsApp = record.paymentStatus === "verified" && record.convocationNumber;

    return (
        <tr className="border-b border-gray-50 hover:bg-[#fff8f8] transition-colors group">
            <td className="px-4 py-4 text-gray-400 font-medium">{index}</td>
            <td className="px-4 py-4">
                <ThumbCell url={record.picture} label="profile photo" />
            </td>
            <td className="px-4 py-4">
                <ThumbCell url={record.paymentSlip} label="payment slip" />
            </td>
            <td className="px-4 py-4 font-black text-[#800000]">
                {record.convocationNumber ?? "—"}
            </td>
            <td className="px-4 py-4 font-bold text-gray-800 whitespace-nowrap group-hover:text-[#800000]">
                {record.name}
            </td>
            <td className="px-4 py-4 text-gray-600 font-mono text-xs max-w-[140px] truncate" title={record.transactionId}>
                {record.transactionId || "—"}
            </td>
            <td className="px-4 py-4">{paymentBadge(record.paymentStatus)}</td>
            <td className="px-4 py-4 text-gray-600 whitespace-nowrap">{record.department || "—"}</td>
            <td className="px-4 py-4">
                <div className="flex items-center gap-1.5 flex-wrap">
                    <button onClick={onView} className="p-2 bg-[#800000] hover:bg-[#600000] text-white rounded-lg" title="View">
                        <Eye size={16} />
                    </button>
                    {record.paymentStatus === "pending" && (
                        <button
                            onClick={onVerify}
                            disabled={verifying}
                            className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg disabled:opacity-50"
                            title="Verify Payment"
                        >
                            <ShieldCheck size={16} />
                        </button>
                    )}
                    {canWhatsApp && (
                        <button
                            onClick={() => openWhatsAppChat(record)}
                            className="p-2 bg-[#25D366] hover:bg-[#1da851] text-white rounded-lg"
                            title="Send WhatsApp"
                        >
                            <MessageCircle size={16} />
                        </button>
                    )}
                    <button onClick={onDelete} className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg" title="Delete">
                        <Trash2 size={16} />
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default ConvocationAdmin;
