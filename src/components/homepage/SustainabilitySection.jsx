const SustainabilitySection = () => {
    return (
        <section className="py-20 bg-green-50">
            <div className="max-w-5xl mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold">
                    Sustainability Impact
                </h2>

                <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                    Every second-hand purchase helps reduce waste, lower carbon
                    emissions, and extend product life. ReSell Hub promotes a
                    sustainable future by encouraging reuse instead of disposal.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mt-12">
                    <div className="bg-white rounded-2xl shadow p-6">
                        <h3 className="text-3xl font-bold text-green-600">
                            40%
                        </h3>
                        <p className="mt-2 text-gray-500">
                            Less Waste Generated
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow p-6">
                        <h3 className="text-3xl font-bold text-green-600">
                            25%
                        </h3>
                        <p className="mt-2 text-gray-500">
                            Lower Carbon Impact
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow p-6">
                        <h3 className="text-3xl font-bold text-green-600">
                            1000+
                        </h3>
                        <p className="mt-2 text-gray-500">
                            Products Reused
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SustainabilitySection;