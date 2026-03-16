import React, { useState, useEffect, useMemo } from "react";
import { CONTENT_API, API_URL, REQUEST_CONFIG } from "../api";
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
    UserX,
    RefreshCw,
    Trash2,
} from "lucide-react";

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────
const getImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `${API_URL}${url}`;
};
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

const attendBadge = (value) =>
    value === "Yes" ? (
        <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
            <CheckCircle2 size={12} /> Attending
        </span>
    ) : (
        <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-orange-100 text-orange-700 border border-orange-200">
            <XCircle size={12} /> Not Attending
        </span>
    );

// CSV download
const downloadCSV = (data, filter) => {
    const filtered = filter === "all" ? data : data.filter((r) => r.attendConvocation === filter);
    const headers = [
        "Name", "Father Name", "Email", "WhatsApp", "College ID", "UHS Reg",
        "PMD Reg", "Academic Session", "Passing Year", "Department", "Current Position",
        "Distinction", "Position Holder", "Attend Convocation", "Registered At",
    ];
    const rows = filtered.map((r) => [
        r.name, r.fatherName, r.email, r.whatsapp, r.collegeId, r.uhsReg,
        r.pmdReg, r.academicSession, r.passingYear, r.department, r.currentPosition,
        r.distinction, r.positionHolder, r.attendConvocation,
        new Date(r.createdAt).toLocaleString(),
    ]);
    const csv = [headers, ...rows].map((row) => row.map((v) => `"${v ?? ""}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `convocation_${filter}_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
};

// ────────────────────────────────────────────────────────────────────────────
// Detail Modal
// ────────────────────────────────────────────────────────────────────────────
function DetailModal({ record, onClose }) {
    const [imgError, setImgError] = useState(false);

    const distinctionYears = record.distinctionFiles
        ? Object.entries(record.distinctionFiles).filter(([, v]) => v)
        : [];
    const positionYears = record.positions
        ? Object.entries(record.positions).filter(([, v]) => v)
        : [];

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div
                className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between bg-[#800000] text-white px-8 py-5 rounded-t-3xl">
                    <div className="flex items-center gap-3">
                        <GraduationCap size={26} />
                        <div>
                            <h2 className="text-xl font-black tracking-tight">{record.name}</h2>
                            <p className="text-white/70 text-sm">{record.department || "—"}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-xl transition-all">
                        <X size={22} />
                    </button>
                </div>

                <div className="p-8 space-y-8">
                    {/* Profile Picture */}
                    <div className="flex justify-center">
                        {record.picture && !imgError ? (
                            <div className="relative">
                                <img
                                    src={getImageUrl(record.picture)}
                                    alt={record.name}
                                    onError={() => setImgError(true)}
                                    className="w-40 h-40 object-cover rounded-2xl shadow-lg border-4 border-[#800000]/20"
                                />
                                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#800000] text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                                    Profile Photo
                                </span>
                            </div>
                        ) : (
                            <div className="w-40 h-40 rounded-2xl bg-[#fff5f5] border-2 border-dashed border-[#800000]/30 flex flex-col items-center justify-center text-[#800000]/40">
                                <ImageIcon size={40} />
                                <span className="text-xs mt-2">No Photo</span>
                            </div>
                        )}
                    </div>

                    {/* Attend Status */}
                    <div className="flex justify-center">{attendBadge(record.attendConvocation)}</div>

                    {/* Personal Info */}
                    <Section title="Personal Information" icon={<User size={18} />}>
                        <Grid>
                            <Field label="Full Name" value={record.name} />
                            <Field label="Father's Name" value={record.fatherName} />
                            <Field label="Email" value={record.email} icon={<Mail size={14} />} />
                            <Field label="WhatsApp" value={record.whatsapp} icon={<Phone size={14} />} />
                        </Grid>
                    </Section>

                    {/* Academic Info */}
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

                    {/* Current Info */}
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

                    {/* Position Holder Details */}
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

                    {/* Distinction Files */}
                    {distinctionYears.length > 0 && (
                        <Section title="Distinction Certificates" icon={<Award size={18} />}>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {distinctionYears.map(([yr, url]) => (
                                    <DistinctionImage key={yr} year={yr} url={url} />
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* Registration Date */}
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

// ────────────────────────────────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────────────────────────────────
function ConvocationAdmin() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filterAttend, setFilterAttend] = useState("all"); // all | Yes | No
    const [filterYear, setFilterYear] = useState("all"); // all | 2017-2025
    const [currentPage, setCurrentPage] = useState(1);
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

    // Reset to first page whenever filters or search change
    useEffect(() => {
        setCurrentPage(1);
    }, [search, filterAttend, filterYear]);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this registration?")) return;
        try {
            await fetch(`${CONTENT_API.CONVOCATION}/${id}`, REQUEST_CONFIG.DELETE);
            fetchRecords();
        } catch (err) {
            console.error("Error deleting registration:", err);
        }
    };

    const filtered = useMemo(() => {
        return records.filter((r) => {
            const matchAttend = filterAttend === "all" || r.attendConvocation === filterAttend;
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
                (r.uhsReg || "").toLowerCase().includes(q);
            return matchAttend && matchYear && matchSearch;
        });
    }, [records, search, filterAttend, filterYear]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paginated = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        return filtered.slice(start, start + PAGE_SIZE);
    }, [filtered, currentPage]);

    const attending = records.filter((r) => r.attendConvocation === "Yes").length;
    const notAttending = records.filter((r) => r.attendConvocation === "No").length;

    return (
        <div className="max-w-[1200px] mx-auto my-10 px-4">
            {/* ── Page Header ───────────────────────────────────── */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#fff5f5] text-[#800000] rounded-2xl">
                        <GraduationCap size={36} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-[#800000] tracking-tight">Convocation Registrations</h2>
                        <p className="text-gray-500 font-medium">View and manage all submitted convocation forms</p>
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

            {/* ── Summary Cards ─────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                <StatCard
                    label="Total Registrations"
                    value={records.length}
                    icon={<Users size={24} />}
                    color="bg-[#800000]"
                    onClick={() => setFilterAttend("all")}
                    active={filterAttend === "all"}
                />
                <StatCard
                    label="Will Attend"
                    value={attending}
                    icon={<CheckCircle2 size={24} />}
                    color="bg-emerald-600"
                    onClick={() => setFilterAttend("Yes")}
                    active={filterAttend === "Yes"}
                />
                <StatCard
                    label="Will NOT Attend"
                    value={notAttending}
                    icon={<UserX size={24} />}
                    color="bg-orange-500"
                    onClick={() => setFilterAttend("No")}
                    active={filterAttend === "No"}
                />
            </div>

            {/* ── Controls ──────────────────────────────────────── */}
            <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
                {/* Search */}
                <div className="relative flex-1 min-w-[220px]">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name, email, department, ID…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#800000] outline-none text-sm bg-white shadow-sm"
                    />
                </div>

                {/* Passing Year filter */}
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

                {/* Download buttons */}
                <div className="flex gap-2 flex-wrap">
                    <DownloadBtn label="Download All" onClick={() => downloadCSV(records, "all")} />
                    <DownloadBtn label="Attending List" color="emerald" onClick={() => downloadCSV(records, "Yes")} />
                    <DownloadBtn label="Not Attending" color="orange" onClick={() => downloadCSV(records, "No")} />
                </div>
            </div>

            {/* ── Table ─────────────────────────────────────────── */}
            {loading ? (
                <div className="flex items-center justify-center p-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <Loader2 size={40} className="text-[#800000] animate-spin" />
                </div>
            ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 text-gray-400">
                    <GraduationCap size={48} className="mb-3" />
                    <p className="font-bold text-lg">No records found</p>
                    <p className="text-sm">Try changing the search or filter</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                    {/* Table wrapper */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-[#800000] text-white text-left">
                                    <th className="px-5 py-4 font-bold whitespace-nowrap">#</th>
                                    <th className="px-5 py-4 font-bold whitespace-nowrap">Photo</th>
                                    <th className="px-5 py-4 font-bold whitespace-nowrap">Name</th>
                                    <th className="px-5 py-4 font-bold whitespace-nowrap">Father's Name</th>
                                    <th className="px-5 py-4 font-bold whitespace-nowrap">College ID</th>
                                    <th className="px-5 py-4 font-bold whitespace-nowrap">Department</th>
                                    <th className="px-5 py-4 font-bold whitespace-nowrap">Session</th>
                                    <th className="px-5 py-4 font-bold whitespace-nowrap">Distinction</th>
                                    <th className="px-5 py-4 font-bold whitespace-nowrap">Attendance</th>
                                    <th className="px-5 py-4 font-bold whitespace-nowrap">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginated.map((r, idx) => (
                                    <TableRow
                                        key={r._id}
                                        record={r}
                                        index={(currentPage - 1) * PAGE_SIZE + idx + 1}
                                        onView={() => setSelected(r)}
                                        onDelete={() => handleDelete(r._id)}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer count + pagination */}
                    <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-t border-gray-100 text-sm text-gray-500 font-medium">
                        <div>
                            Showing{" "}
                            {filtered.length === 0
                                ? 0
                                : (currentPage - 1) * PAGE_SIZE + 1}{" "}
                            -
                            {" "}
                            {Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length} filtered record
                            {filtered.length !== 1 ? "s" : ""} (total {records.length})
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${currentPage === 1
                                        ? "text-gray-300 border-gray-100 cursor-not-allowed"
                                        : "text-[#800000] border-[#800000]/30 hover:bg-[#fff5f5]"
                                    }`}
                            >
                                Prev
                            </button>
                            <span className="text-xs text-gray-500">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${currentPage === totalPages
                                        ? "text-gray-300 border-gray-100 cursor-not-allowed"
                                        : "text-[#800000] border-[#800000]/30 hover:bg-[#fff5f5]"
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Detail Modal ──────────────────────────────────── */}
            {selected && <DetailModal record={selected} onClose={() => setSelected(null)} />}
        </div>
    );
}

// ── Sub-components ─────────────────────────────────────────────────────────
function StatCard({ label, value, icon, color, onClick, active }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-4 p-5 rounded-2xl text-left transition-all cursor-pointer shadow-sm border-2 ${active ? "border-[#800000] shadow-lg scale-[1.02]" : "border-transparent hover:shadow-md"
                } bg-white`}
        >
            <div className={`p-3 rounded-xl text-white ${color}`}>{icon}</div>
            <div>
                <p className="text-2xl font-black text-gray-800">{value}</p>
                <p className="text-sm text-gray-500 font-medium">{label}</p>
            </div>
        </button>
    );
}

function DownloadBtn({ label, onClick, color = "maroon" }) {
    const colors = {
        maroon: "bg-[#800000] hover:bg-[#600000] text-white",
        emerald: "bg-emerald-600 hover:bg-emerald-700 text-white",
        orange: "bg-orange-500 hover:bg-orange-600 text-white",
    };
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 py-2.5 px-4 rounded-xl font-bold text-sm transition-all hover:shadow-md hover:-translate-y-0.5 ${colors[color]}`}
        >
            <Download size={15} />
            {label}
        </button>
    );
}

function TableRow({ record, index, onView, onDelete }) {
    const [imgErr, setImgErr] = useState(false);
    return (
        <tr className="border-b border-gray-50 hover:bg-[#fff8f8] transition-colors group">
            <td className="px-5 py-4 text-gray-400 font-medium">{index}</td>
            <td className="px-5 py-4">
                {record.picture && !imgErr ? (
                    <img
                        src={getImageUrl(record.picture)}
                        alt={record.name}
                        onError={() => setImgErr(true)}
                        className="w-10 h-10 rounded-full object-cover border-2 border-[#800000]/20 shadow-sm"
                    />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-[#fff5f5] flex items-center justify-center text-[#800000]/40">
                        <User size={18} />
                    </div>
                )}
            </td>
            <td className="px-5 py-4 font-bold text-gray-800 whitespace-nowrap group-hover:text-[#800000] transition-colors">
                {record.name}
            </td>
            <td className="px-5 py-4 text-gray-600 whitespace-nowrap">{record.fatherName}</td>
            <td className="px-5 py-4 text-gray-500 font-mono text-xs">{record.collegeId || "—"}</td>
            <td className="px-5 py-4 text-gray-600 whitespace-nowrap">{record.department || "—"}</td>
            <td className="px-5 py-4 text-gray-500 whitespace-nowrap">{record.academicSession || "—"}</td>
            <td className="px-5 py-4">{badge(record.distinction)}</td>
            <td className="px-5 py-4">{attendBadge(record.attendConvocation)}</td>
            <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                    <button
                        onClick={onView}
                        className="flex items-center justify-center p-2 bg-[#800000] hover:bg-[#600000] text-white rounded-lg transition-all hover:shadow-md"
                        title="View Details"
                    >
                        <Eye size={16} />
                    </button>
                    <button
                        onClick={onDelete}
                        className="flex items-center justify-center p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-all"
                        title="Delete Record"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default ConvocationAdmin;
