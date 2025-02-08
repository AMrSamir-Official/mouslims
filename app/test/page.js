// app/test/page.js


const JuzsPage = async () => {
    // جلب البيانات من واجهة برمجة التطبيقات
    const res = await fetch('https://api.quran.com/api/v4/juzs', {
        next: { revalidate: 60 }, // تحديث البيانات كل 60 ثانية
    });

    const data = await res.json();
    const juzs = data.data || []; // التأكد من وجود البيانات

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">قائمة الجوز</h1>
            <ul className="list-disc pl-5">
                {juzs.map((juz) => (
                    <li key={juz.id} className="mb-2">
                        <h2 className="font-semibold">جوز {juz.number}</h2>
                        <p>{juz.verse_count} آية</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JuzsPage;
