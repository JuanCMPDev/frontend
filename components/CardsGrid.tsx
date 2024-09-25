import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { lotesData, plantasData } from '@/utils/dummyData';
import CardItem from './CardItem';

const CardsGrid = ({ activeSection }: any) => {
  const [sortOrder, setSortOrder] = useState('newest');
  const [activeButtons, setActiveButtons] = useState({
    lotes: { cardIndex: null, buttonType: null },
    plantas: { cardIndex: null, buttonType: null }
  });
  const [activeModal, setActiveModal] = useState<number | null>(null);

  const sortedData = (activeSection === 'lotes' ? lotesData : plantasData).sort((a, b) => {
    if (sortOrder === 'newest') {
      return b.createdAt.getTime() - a.createdAt.getTime();
    } else {
      return a.createdAt.getTime() - b.createdAt.getTime();
    }
  });

  const handleButtonClick = (index: number, buttonType: string) => {
    setActiveButtons(prev => ({
      ...prev,
      [activeSection]: prev[activeSection].cardIndex === index && prev[activeSection].buttonType === buttonType
        ? { cardIndex: null, buttonType: null } // Desactiva el botón si ya está activo
        : { cardIndex: index, buttonType } // Activa el nuevo botón
    }));
  };

  const handleModalClick = (index: number) => {
    setActiveModal(prev => (prev === index ? null : index)); // Alterna el estado del modal
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-dark-400">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{activeSection === 'lotes' ? 'Lotes' : 'Plantas'}</h2>
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <div className="flex items-center gap-4">
            <p>Ordenar por:</p>
            <SelectTrigger className="w-[200px] shad-select-trigger">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent className="shad-select-content">
              <SelectItem value="newest">Más recientes primero</SelectItem>
              <SelectItem value="oldest">Más antiguos primero</SelectItem>
            </SelectContent>
          </div>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedData.map((item, index) => (
          <CardItem
            key={index}
            item={item}
            index={index}
            activeButton={activeButtons[activeSection]}
            handleButtonClick={handleButtonClick}
            handleModalClick={handleModalClick}
            activeModal={activeModal}
            activeSection={activeSection}
          />
        ))}
      </div>
    </div>
  );
};

export default CardsGrid;
