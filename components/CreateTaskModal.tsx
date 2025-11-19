import React, { useState } from 'react';
import { Task } from '../types';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: Omit<Task, 'id' | 'state' | 'points'> & { points: number }) => void;
}

type TaskFormData = Omit<Task, 'id' | 'state' | 'deadline' | 'points'> & { deadline: string; points: string };

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    deadline: '',
    tags: [],
    requiredScore: 0,
    difficulty: 1,
    points: '10',
  });

  const [tagsInput, setTagsInput] = useState('');

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'requiredScore' || name === 'points' ? parseInt(value) || 0 : value,
    }));
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1 && value <= 4) {
      setFormData(prev => ({ ...prev, difficulty: value as Task['difficulty'] }));
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => setTagsInput(e.target.value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const taskData = {
      ...formData,
      tags: tagsInput.split(',').map(tag => tag.trim()).filter(Boolean),
      points: parseInt(formData.points) || 10,
    };
    onSubmit(taskData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-2 sm:p-4">
      {/* Modal container */}
      <div className="bg-[#212529] rounded-lg shadow-lg w-full max-w-lg sm:max-w-xl md:max-w-2xl max-h-[90vh] overflow-y-auto p-4 flex flex-col">
        <h2 className="text-lg sm:text-xl text-center mb-4 font-bold">Create New Quest</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="nes-field w-full">
              <label htmlFor="title_field">Title</label>
              <input
                type="text"
                id="title_field"
                name="title"
                className="nes-input w-full"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="nes-field w-full">
              <label htmlFor="description_field">Description</label>
              <textarea
                id="description_field"
                name="description"
                className="nes-textarea w-full"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="nes-field w-full">
                <label htmlFor="deadline_field">Deadline</label>
                <input
                  type="date"
                  id="deadline_field"
                  name="deadline"
                  className="nes-input w-full"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="nes-field w-full">
                <label htmlFor="tags_field">Tags (comma separated)</label>
                <input
                  type="text"
                  id="tags_field"
                  name="tags"
                  className="nes-input w-full"
                  value={tagsInput}
                  onChange={handleTagsChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="nes-field w-full">
                <label htmlFor="requiredScore_field">Required Score</label>
                <input
                  type="number"
                  id="requiredScore_field"
                  name="requiredScore"
                  className="nes-input w-full"
                  value={formData.requiredScore}
                  onChange={handleChange}
                  min={0}
                />
              </div>

              <div className="nes-field w-full">
                <label htmlFor="points_field">Points Awarded</label>
                <input
                  type="number"
                  id="points_field"
                  name="points"
                  className="nes-input w-full"
                  value={formData.points}
                  onChange={handleChange}
                  min={1}
                />
              </div>
            </div>

            <div className="nes-field w-full">
              <label>Difficulty: {formData.difficulty} Star(s)</label>
              <input
                type="range"
                min="1"
                max="4"
                step="1"
                value={formData.difficulty}
                onChange={handleDifficultyChange}
                className="w-full"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 mt-2">
            <button
              type="button"
              className="nes-btn w-full sm:w-auto"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="nes-btn is-primary w-full sm:w-auto"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
