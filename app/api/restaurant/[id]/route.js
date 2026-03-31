export async function GET(request, { params }) {
    try {
        const { id } = await params;

        console.log("Restaurant ID:", id);

        const res = await fetch(
            `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=21.99740&lng=79.00110&restaurantId=${id}&submitAction=ENTER`,
            {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                    Accept: "application/json",
                },
            }
        );

        const text = await res.text();

        if (!text) {
            throw new Error("Empty response from Swiggy API");
        }

        const data = JSON.parse(text);

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("API ERROR:", error);

        return new Response(
            JSON.stringify({ error: "Failed to fetch restaurant data" }),
            { status: 500 }
        );
    }
}