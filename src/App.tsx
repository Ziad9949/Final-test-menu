import React, { useEffect, useState, useRef } from 'react';
import { Utensils } from 'lucide-react';
import { fetchMenuData } from './utils/fetchMenu';
import { MenuCategory } from './components/MenuCategory';
import type { MenuData } from './types';

function App() {
  const [menuData, setMenuData] = useState<MenuData>({ categories: [], items: {} });
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const categoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMenuData = async () => {
      const data = await fetchMenuData();
      setMenuData(data);
      if (data.categories.length > 0) {
        setSelectedCategory(data.categories[0]);
      }
    };
    loadMenuData();
  }, []);

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoriesRef.current) {
      const scrollAmount = 200;
      categoriesRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <Utensils className="h-8 w-8 text-orange-500 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Gourmet Delights</h1>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="relative bg-white z-10">
        <button
          onClick={() => scrollCategories('left')}
          className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-white to-transparent px-4"
        >
          ‹
        </button>
        <div
          ref={categoriesRef}
          className="flex overflow-x-auto scrollbar-hide py-4 px-8 space-x-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {menuData.categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                whitespace-nowrap px-6 py-2 rounded-full text-sm font-medium
                transition-colors duration-200
                ${selectedCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
        <button
          onClick={() => scrollCategories('right')}
          className="absolute right-0 top-0 bottom-0 bg-gradient-to-l from-white to-transparent px-4"
        >
          ›
        </button>
      </div>

      {/* Menu Items with background */}
      <div 
        className="flex-1 bg-cover bg-center bg-fixed"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop")',
        }}
      >
        <div className="bg-black/40 min-h-full">
          <div className="container mx-auto py-8">
            {selectedCategory && menuData.items[selectedCategory] && (
              <MenuCategory items={menuData.items[selectedCategory]} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;