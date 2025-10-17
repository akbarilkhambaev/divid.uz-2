import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function AddNewsModal({ open, onClose, onAdded, editData }) {
  const [title, setTitle] = useState(editData?.title || '');
  const [description, setDescription] = useState(editData?.description || '');
  const [fullDescription, setFullDescription] = useState(
    editData?.full_description || ''
  );
  const [imageBase64, setImageBase64] = useState(editData?.imageBase64 || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editData) {
      setTitle(editData.title || '');
      setDescription(editData.description || '');
      setFullDescription(editData.full_description || '');
      setImageBase64(editData.imageBase64 || '');
    } else {
      setTitle('');
      setDescription('');
      setFullDescription('');
      setImageBase64('');
    }
  }, [editData, open]);

  if (!open) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImageBase64(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (editData && editData.id) {
        // Редактирование
        const docRef = doc(db, 'news', editData.id);
        await updateDoc(docRef, {
          title,
          description,
          full_description: fullDescription,
          imageBase64,
        });
      } else {
        // Добавление
        await addDoc(collection(db, 'news'), {
          title,
          description,
          full_description: fullDescription,
          imageBase64,
          createdAt: Timestamp.now(),
        });
      }
      setTitle('');
      setDescription('');
      setFullDescription('');
      setImageBase64('');
      onAdded && onAdded();
      onClose();
    } catch (err) {
      setError('Ошибка при сохранении новости');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-[80%] max-h-[90vh] overflow-y-auto relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl"
          onClick={onClose}
        >
          &#10005;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-blue-700">
          {editData ? 'Редактировать новость' : 'Добавить новость'}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          />
          <label className="font-semibold">Полное описание</label>
          <div className="border rounded-lg p-2 mb-2">
            <CKEditor
              editor={ClassicEditor}
              data={fullDescription}
              onChange={(event, editor) => {
                setFullDescription(editor.getData());
              }}
              config={{
                toolbar: [
                  'heading',
                  '|',
                  'bold',
                  'italic',
                  'link',
                  'bulletedList',
                  'numberedList',
                  'blockQuote',
                  'undo',
                  'redo',
                  'imageUpload',
                  'mediaEmbed',
                ],
              }}
            />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="p-2 border rounded-lg"
          />
          {imageBase64 && (
            <img
              src={imageBase64}
              alt="preview"
              className="w-full h-40 object-cover rounded-lg mb-2"
            />
          )}
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            {loading ? 'Сохраняем...' : editData ? 'Сохранить' : 'Добавить'}
          </button>
        </form>
      </div>
    </div>
  );
}
