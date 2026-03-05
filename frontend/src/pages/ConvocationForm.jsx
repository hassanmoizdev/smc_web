import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import { CONTENT_API } from "../api";

const ConvocationForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        fatherName: "",
        picture: null,
        countryCode: "+92",
        whatsapp: "",
        email: "",
        collegeId: "",
        uhsReg: "",
        pmdReg: "",
        academicSession: "",
        passingYear: "",
        distinction: "No",
        distinctionFiles: {
            year1: null,
            year2: null,
            year3: null,
            year4: null,
            year5: null,
        },
        positionHolder: "No",
        positions: {
            year1: "",
            year2: "",
            year3: "",
            year4: "",
            year5: "",
        },
        department: "",
        currentPosition: "",
        attendConvocation: "Yes",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleDistinctionFileChange = (e, year) => {
        setFormData({
            ...formData,
            distinctionFiles: {
                ...formData.distinctionFiles,
                [year]: e.target.files[0],
            },
        });
    };

    const handlePositionChange = (e, year) => {
        setFormData({
            ...formData,
            positions: {
                ...formData.positions,
                [year]: e.target.value,
            },
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: "", message: "" });

        const data = new FormData();

        // Append all text fields
        Object.keys(formData).forEach(key => {
            if (key !== "picture" && key !== "distinctionFiles" && key !== "positions") {
                data.append(key, formData[key]);
            }
        });

        // Append simple sub-objects (positions) by flat key
        if (formData.positionHolder === "Yes") {
            Object.keys(formData.positions).forEach(year => {
                data.append(`position_${year}`, formData.positions[year]);
            });
        }

        // Append main picture
        if (formData.picture) {
            data.append("picture", formData.picture);
        }

        // Append distinction files if applicable
        if (formData.distinction === "Yes") {
            Object.keys(formData.distinctionFiles).forEach(year => {
                if (formData.distinctionFiles[year]) {
                    data.append(`distinction_${year}`, formData.distinctionFiles[year]);
                }
            });
        }

        try {
            const response = await fetch(CONTENT_API.CONVOCATION, {
                method: "POST",
                body: data, // fetch automatically sets the correct boundaries for FormData
            });

            const result = await response.json();

            if (response.ok) {
                setSubmitStatus({ type: "success", message: "Form submitted successfully!" });
                // Reset form optionally here
            } else {
                setSubmitStatus({ type: "error", message: result.error || "Failed to submit form." });
            }
        } catch (error) {
            console.error("Submission error:", error);
            setSubmitStatus({ type: "error", message: "An error occurred while submitting." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Convocation Registration | SMC</title>
            </Helmet>
            <Header />

            <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-0">
                <div className="max-w-4xl mx-auto bg-white shadow-xl flex flex-col rounded-lg overflow-hidden border border-gray-100">
                    <div className="bg-[#8b0000] text-white py-6 px-8 text-center">
                        <h1 className="text-3xl font-bold font-serif tracking-wide">Convocation Registration Form</h1>
                        <p className="mt-2 text-sm opacity-90">*Convocation expected date in April/May 2026</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-8">

                        {/* Personal Details */}
                        <div>
                            <h2 className="text-xl font-semibold border-b pb-2 mb-4 text-[#8b0000]">Personal Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#8b0000] focus:border-[#8b0000]" placeholder="Enter your name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
                                    <input type="text" name="fatherName" required value={formData.fatherName} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#8b0000] focus:border-[#8b0000]" placeholder="Enter father's name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
                                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#8b0000] focus:border-[#8b0000]" placeholder="example@email.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp #</label>
                                    <div className="flex gap-2">
                                        <select name="countryCode" value={formData.countryCode} onChange={handleChange} className="w-1/3 border border-gray-300 rounded-md p-2 focus:ring-[#8b0000] focus:border-[#8b0000] bg-white">
                                            <option value="+92">+92 (PK)</option>
                                            <option value="+1">+1 (US/CA)</option>
                                            <option value="+44">+44 (UK)</option>
                                            <option value="+971">+971 (UAE)</option>
                                            <option value="+966">+966 (SA)</option>
                                            <option value="+61">+61 (AU)</option>
                                        </select>
                                        <input type="text" name="whatsapp" required value={formData.whatsapp} onChange={handleChange} className="w-2/3 border border-gray-300 rounded-md p-2 focus:ring-[#8b0000] focus:border-[#8b0000]" placeholder="3XX XXXXXXX" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Recent Passport Size Picture</label>
                                    <input type="file" name="picture" accept="image/*" onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#8b0000] file:text-white hover:file:bg-[#6b0000]" />
                                </div>
                            </div>
                        </div>

                        {/* Academic Details */}
                        <div>
                            <h2 className="text-xl font-semibold border-b pb-2 mb-4 text-[#8b0000]">Academic Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">College ID</label>
                                    <input type="text" name="collegeId" value={formData.collegeId} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#8b0000] focus:border-[#8b0000]" placeholder="Enter College ID" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">UHS Reg#</label>
                                    <input type="text" name="uhsReg" value={formData.uhsReg} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#8b0000] focus:border-[#8b0000]" placeholder="Enter UHS Registration Number" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">PMD Reg#</label>
                                    <input type="text" name="pmdReg" value={formData.pmdReg} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#8b0000] focus:border-[#8b0000]" placeholder="Enter PMD Registration Number" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Academic Session</label>
                                    <input type="text" name="academicSession" value={formData.academicSession} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#8b0000] focus:border-[#8b0000]" placeholder="e.g. 2021-2026" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Passing Year (As on MBBS Degree)</label>
                                    <input type="text" name="passingYear" value={formData.passingYear} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#8b0000] focus:border-[#8b0000]" placeholder="e.g. 2025" />
                                </div>
                            </div>
                        </div>

                        {/* Distinction Details */}
                        <div>
                            <h2 className="text-xl font-semibold border-b pb-2 mb-4 text-[#8b0000]">Distinction Details</h2>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subject of Distinction?</label>
                                <div className="flex gap-4">
                                    <label className="inline-flex items-center">
                                        <input type="radio" name="distinction" value="Yes" checked={formData.distinction === "Yes"} onChange={handleChange} className="text-[#8b0000] focus:ring-[#8b0000]" />
                                        <span className="ml-2">Yes</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input type="radio" name="distinction" value="No" checked={formData.distinction === "No"} onChange={handleChange} className="text-[#8b0000] focus:ring-[#8b0000]" />
                                        <span className="ml-2">No</span>
                                    </label>
                                </div>
                            </div>

                            {formData.distinction === "Yes" && (
                                <div className="bg-gray-50 border border-gray-200 p-4 rounded-md grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {["year1", "year2", "year3", "year4", "year5"].map((yr, index) => (
                                        <div key={yr}>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">{index + 1}{index === 0 ? "st" : index === 1 ? "nd" : index === 2 ? "rd" : "th"} Year Attachment</label>
                                            <input type="file" onChange={(e) => handleDistinctionFileChange(e, yr)} className="w-full border border-gray-300 rounded-md p-1.5 text-sm" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Position Holder Details */}
                        <div>
                            <h2 className="text-xl font-semibold border-b pb-2 mb-4 text-[#8b0000]">Position Holder Details</h2>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Are you a Position Holder?</label>
                                <div className="flex gap-4">
                                    <label className="inline-flex items-center">
                                        <input type="radio" name="positionHolder" value="Yes" checked={formData.positionHolder === "Yes"} onChange={handleChange} className="text-[#8b0000] focus:ring-[#8b0000]" />
                                        <span className="ml-2">Yes</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input type="radio" name="positionHolder" value="No" checked={formData.positionHolder === "No"} onChange={handleChange} className="text-[#8b0000] focus:ring-[#8b0000]" />
                                        <span className="ml-2">No</span>
                                    </label>
                                </div>
                            </div>

                            {formData.positionHolder === "Yes" && (
                                <div className="bg-gray-50 border border-gray-200 p-4 rounded-md grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {["year1", "year2", "year3", "year4", "year5"].map((yr, index) => (
                                        <div key={yr}>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">{index + 1}{index === 0 ? "st" : index === 1 ? "nd" : index === 2 ? "rd" : "th"} Year Position</label>
                                            <select value={formData.positions[yr]} onChange={(e) => handlePositionChange(e, yr)} className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#8b0000] focus:border-[#8b0000]">
                                                <option value="">Select Position</option>
                                                <option value="1st">1st Position</option>
                                                <option value="2nd">2nd Position</option>
                                                <option value="3rd">3rd Position</option>
                                            </select>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Current Status */}
                        <div>
                            <h2 className="text-xl font-semibold border-b pb-2 mb-4 text-[#8b0000]">Current Status</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                    <input type="text" name="department" value={formData.department} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#8b0000] focus:border-[#8b0000]" placeholder="E.g. Cardiology, Surgery, etc." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Do you want to attend the convocation?</label>
                                    <div className="flex gap-4">
                                        <label className="inline-flex items-center">
                                            <input type="radio" name="attendConvocation" value="Yes" checked={formData.attendConvocation === "Yes"} onChange={handleChange} className="text-[#8b0000] focus:ring-[#8b0000]" />
                                            <span className="ml-2">Yes</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input type="radio" name="attendConvocation" value="No" checked={formData.attendConvocation === "No"} onChange={handleChange} className="text-[#8b0000] focus:ring-[#8b0000]" />
                                            <span className="ml-2">No</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Working Position / Details</label>
                                    <textarea name="currentPosition" rows="3" value={formData.currentPosition} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#8b0000] focus:border-[#8b0000]" placeholder="Detail your current working position..."></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-200 flex flex-col items-end gap-4">
                            {submitStatus.message && (
                                <div className={`w-full p-3 rounded-md text-sm ${submitStatus.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                                    {submitStatus.message}
                                </div>
                            )}
                            <button type="submit" disabled={isSubmitting} className="bg-[#8b0000] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#6b0000] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8b0000] disabled:bg-gray-400 disabled:cursor-not-allowed">
                                {isSubmitting ? "Submitting..." : "Submit Form"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ConvocationForm;
