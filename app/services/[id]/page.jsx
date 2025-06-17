'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ServiceDetailPage() {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/services/${id}/`)
      .then((res) => res.json())
      .then((data) => setService(data))
      .catch((err) => console.error('Ошибка загрузки:', err));
  }, [id]);

  if (!service) return <p className="p-6">Загрузка...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
      <iframe
        width="100%"
        height="400"
        src={service.youtube_url?.replace('watch?v=', 'embed/') || ''}
        title={service.title}
        allowFullScreen
        className="mb-4"
      />
      <p className="text-gray-700 mb-6">{service.description}</p>
      <p className="text-sm text-gray-500">ID услуги: {service.id}</p>
    </div>
  );
}
