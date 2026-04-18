export default function QuoteCard({ quote }) { 
    const { quote: text, author, work, categories } = quote;
    return (
        <>
            <div className="quote-card">
                <blockquote>"{text}"</blockquote>
                <p className="author"> - {author}</p>
                {work && <p className="work">From: {work}</p>}
                <div className="tags">
                    {categories.map((cat) => (
                        <span key={cat} className="tag">
                            {cat}
                        </span>
                    ))}
                </div>
            </div>
        </>
    );
}