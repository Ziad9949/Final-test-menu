const SHEET_ID = '1ljpWRKVwNKlng_vdT2yYgKGVnRmQ1nJ7_-tk3bnmi6U';
const SHEET_NAME = 'Menu';

export async function fetchMenuData() {
  try {
    const response = await fetch(
      `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`
    );
    const text = await response.text();
    const jsonString = text.substring(47).slice(0, -2);
    const json = JSON.parse(jsonString);
    
    // Extract the data from the response
    const rows = json.table.rows;
    const menuItems = rows.slice(1).map((row: any) => ({
      category: row.c[0]?.v || '',
      name: row.c[1]?.v || '',
      description: row.c[2]?.v || '',
      small_price: row.c[3]?.v || '',
      medium_price: row.c[4]?.v || '',
      large_price: row.c[5]?.v || ''
    }));

    // Get unique categories
    const categories = Array.from(new Set(menuItems.map(item => item.category)));

    // Group items by category
    const items = categories.reduce((acc, category) => {
      acc[category] = menuItems.filter(item => item.category === category);
      return acc;
    }, {} as Record<string, any>);

    return { categories, items };
  } catch (error) {
    console.error('Error fetching menu data:', error);
    return { categories: [], items: {} };
  }
}
