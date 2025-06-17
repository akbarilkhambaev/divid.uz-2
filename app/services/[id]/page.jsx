import { db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export const dynamicParams = false;

export async function generateStaticParams() {
  const snapshot = await getDocs(collection(db, 'services'));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
  }));
}

export default async function ServiceDetailPage({ params }) {
  const docRef = doc(db, 'services', params.id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return <div className="p-6 text-red-500">Услуга не найдена</div>;
  }

  const service = docSnap.data();

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
      <p className="text-sm text-gray-500">ID услуги: {params.id}</p>
    </div>
  );
}
