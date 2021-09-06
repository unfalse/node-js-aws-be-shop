import { connect } from './connect';

export const getProductsListFromDb = async () => {
    const client = await connect();
    try {
        const { rows: products } = await client.query(`
            select id, title, description, price, img_url, s.count 
            from public.products p left join public.stocks s
            on p.id = s.product_id
        `);
        return products;
    } catch (error) {
        throw error;
    } finally {
        client.end();
    }
};

export const getProductByIdFromDb = async id => {
    const client = await connect();
    try {
        const { rows: products } = await client.query(`
            select id, title, description, price, img_url, s.count 
            from public.products p left join public.stocks s
            on p.id = s.product_id
            where p.id = $1
        `, [id]);
        return products;
    } catch (error) {
        throw error;
    } finally {
        client.end();
    }
}

export const addProductToDb = async ({title, description, price, img_url}) => {
    const client = await connect();
    try {
        await client.query('BEGIN');
        const {rows:[{id}]} = await client.query(`
            insert into public.products(id, title, description, price, img_url)
            values (uuid_generate_v4(), $1, $2, $3, $4)
            returning *
        `, [title, description, price, img_url]);
        await client.query(`
            insert into public.stocks(product_id, count)
            values ($1, $2)
        `, [id, 1]);
        await client.query('COMMIT');
    } catch(error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.end();
    }
}