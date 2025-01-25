import React from 'react';
import { MenuItem } from '../types';

interface MenuCategoryProps {
  items: MenuItem[];
}

export function MenuCategory({ items }: MenuCategoryProps) {
  return (
    <div className="grid gap-6 px-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
              <p className="mt-2 text-gray-600">{item.description}</p>
            </div>
            <div className="ml-4 text-right">
              {item.small_price && (
                <div className="text-gray-900">
                  <span className="text-sm font-medium">Small</span>
                  <span className="ml-2">${item.small_price}</span>
                </div>
              )}
              {item.medium_price && (
                <div className="text-gray-900 mt-1">
                  <span className="text-sm font-medium">Medium</span>
                  <span className="ml-2">${item.medium_price}</span>
                </div>
              )}
              {item.large_price && (
                <div className="text-gray-900 mt-1">
                  <span className="text-sm font-medium">Large</span>
                  <span className="ml-2">${item.large_price}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}