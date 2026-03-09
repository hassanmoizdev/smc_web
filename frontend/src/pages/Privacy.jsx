import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

function PrivacySMC() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        {
            id: "introduction",
            title: "Introduction",
            content: "Sargodha Medical College (SMC), is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or use our services."
        },
        {
            id: "information-collection",
            title: "1. Information Collection",
            content: "We collect information that you provide directly to us, such as when you fill out contact forms, registration forms, or application forms. This may include:",
            list: [
                "Personal Identification: Name, Email Address, Phone Number, and Mailing Address.",
                "Academic Records: Enrollment numbers, department choices, and previous educational history for applicants.",
                "Technical Data: IP address, browser type, and usage patterns through cookies and logs."
            ]
        },
        {
            id: "how-we-use",
            title: "2. How We Use Your Information",
            content: "Your information is used to provide and improve our academic and administrative services, including:",
            list: [
                "Processing admissions and registrations.",
                "Responding to inquiries and providing technical support.",
                "Sending official announcements, newsletters, and event updates.",
                "Complying with legal and regulatory requirements from the University of Sargodha and relevant medical councils."
            ]
        },
        {
            id: "data-security",
            title: "3. Data Security",
            content: "We implement robust security measures to protect your data from unauthorized access, alteration, or disclosure. However, please note that no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security."
        },
        {
            id: "third-party-sharing",
            title: "4. Third-Party Sharing",
            content: "We do not sell or trade your personal information. We may share data with trusted third parties (such as educational regulators or system administrators) only when necessary to perform our services or comply with the law."
        },
        {
            id: "your-rights",
            title: "5. Your Rights",
            content: "You have the right to access, update, or request the deletion of your personal information held by us. If you wish to exercise these rights, please contact our administration office."
        }
    ];

    return (
        <div className="min-h-screen bg-[#fcfcfc] font-['Inter',sans-serif] text-[#333]">
            <Helmet>
                <title>Privacy Policy | Sargodha Medical College</title>
            </Helmet>

            <Header />

            <main className="max-w-[1000px] mx-auto px-6 py-16 md:py-24">
                {/* Hero Section */}
                <div className="text-center mb-16 animate-fadeIn">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#8B0000] mb-4 tracking-tight">
                        Privacy Policy
                    </h1>
                    <div className="w-20 h-1.5 bg-[#8B0000] mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Effective Date: January 27, 2026. This policy outlines our commitment to transparency and the protection of your digital footprint.
                    </p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
                    {/* Main Content */}
                    <div className="space-y-12">
                        {sections.map((section) => (
                            <section key={section.id} id={section.id} className="scroll-mt-24 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
                                <h2 className="text-2xl font-bold text-[#222] mb-4 flex items-center gap-3">
                                    <span className="w-1.5 h-8 bg-[#8B0000] rounded-full inline-block"></span>
                                    {section.title}
                                </h2>
                                <p className="text-gray-600 leading-[1.8] text-lg mb-4">
                                    {section.content}
                                </p>
                                {section.list && (
                                    <ul className="space-y-3 pl-4">
                                        {section.list.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-gray-700">
                                                <span className="text-[#8B0000] mt-1.5">•</span>
                                                <span className="text-lg leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </section>
                        ))}

                        <section className="bg-[#8B0000] text-white p-8 rounded-2xl shadow-xl shadow-red-900/10">
                            <h2 className="text-2xl font-bold mb-4">Contact Administration</h2>
                            <p className="mb-6 opacity-90 text-lg">
                                For any questions regarding this policy or your data, please reach out to our IT or Admissions department.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm uppercase tracking-wider opacity-70 mb-1">Email Address</p>
                                    <a href="mailto:principle.smc.health@punjab.gov.pk" className="text-lg font-medium hover:underline">
                                        principle.smc.health@punjab.gov.pk
                                    </a>
                                </div>
                                <div>
                                    <p className="text-sm uppercase tracking-wider opacity-70 mb-1">Phone Number</p>
                                    <p className="text-lg font-medium">(048) 923-2004</p>
                                </div>
                                <div className="sm:col-span-2">
                                    <p className="text-sm uppercase tracking-wider opacity-70 mb-1">Physical Address</p>
                                    <p className="text-lg font-medium leading-relaxed">
                                        Faisalbad Road, Sargodha, Pakistan
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Quick Nav Sidebar */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                                    Table of Contents
                                </h3>
                                <nav className="flex flex-col gap-3">
                                    {sections.map((section) => (
                                        <a
                                            key={section.id}
                                            href={`#${section.id}`}
                                            className="text-gray-600 hover:text-[#8B0000] font-medium transition-colors duration-200 py-1"
                                        >
                                            {section.title}
                                        </a>
                                    ))}
                                </nav>
                            </div>

                            <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                                <p className="text-sm text-[#8B0000] leading-relaxed italic">
                                    "Protecting student data is our priority at SMC."
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />

            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        main {
          animation: fadeIn 1s ease-out 0.2s forwards;
          opacity: 0;
        }
      `}</style>
        </div>
    );
}

export default PrivacySMC;
