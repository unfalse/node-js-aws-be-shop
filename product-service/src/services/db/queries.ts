export const getProductsList = async client => {
    const { rows: products } = await client.query(`
        select id, title, description, price, img_url, s.count 
        from public.products p left join public.stocks s
        on p.id = s.product_id
    `);
    return products;
};

export const getProductById = async (client, id) => {
    const { rows: products } = await client.query(`
        select id, title, description, price, img_url, s.count 
        from public.products p left join public.stocks s
        on p.id = s.product_id
        where p.id = ${id}
    `);
    return products;
}
