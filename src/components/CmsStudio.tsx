import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Check,
  RefreshCw,
  FolderOpen,
  Box,
  Settings,
  Palette,
  Eye,
  ArrowRight,
  Layers,
  Sparkles
} from 'lucide-react';
import { Project, BespokeObject, StudioConfig, ProjectCategory } from '../types';

interface CmsStudioProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  objects: BespokeObject[];
  setObjects: React.Dispatch<React.SetStateAction<BespokeObject[]>>;
  studioConfig: StudioConfig;
  setStudioConfig: React.Dispatch<React.SetStateAction<StudioConfig>>;
  onResetDefaults: () => void;
}

export const CmsStudio: React.FC<CmsStudioProps> = ({
  isOpen,
  onClose,
  projects,
  setProjects,
  objects,
  setObjects,
  studioConfig,
  setStudioConfig,
  onResetDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<'proyectos' | 'objetos' | 'marca' | 'atmosfera'>('proyectos');
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingObjectId, setEditingObjectId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Editing Project State
  const currentEditingProject = projects.find((p) => p.id === editingProjectId);

  const handleUpdateProjectField = (field: keyof Project, value: any) => {
    if (!editingProjectId) return;
    setProjects((prev) =>
      prev.map((p) => (p.id === editingProjectId ? { ...p, [field]: value } : p))
    );
    showNotification('Cambios guardados en vivo');
  };

  const handleAddNewProject = () => {
    const newId = `proyecto-${Date.now()}`;
    const newProject: Project = {
      id: newId,
      title: 'Nueva Residencia en el Valle',
      subtitle: 'Arquitectura interior en hormigón blanco y nogal canaletto',
      category: 'Residencial',
      year: new Date().getFullYear(),
      location: 'Mallorca, España',
      areaM2: 380,
      leadArchitect: 'Equipo Atelier',
      status: 'En Construcción',
      coverImage: '/assets/images/project_retail_gallery_1790609033073.jpg',
      secondaryImages: [
        '/assets/images/hero_mediterranean_living_1790608992684.jpg'
      ],
      description: 'Una composición geométrica orientada al horizonte mediterráneo, priorizando la ventilación cruzada y la luz rasante matutina.',
      concept: 'Integración paisajística y eliminación de tabiquería convencional para generar diafanidad continua.',
      materials: [
        {
          name: 'Caliza de Capri',
          type: 'Piedra Natural',
          origin: 'Italia',
          toneHex: '#DDD5C7',
          description: 'Acabado apomazado con suave reflectancia difusa.'
        }
      ],
      featured: false,
      order: projects.length + 1,
    };
    setProjects([newProject, ...projects]);
    setEditingProjectId(newId);
    showNotification('Nuevo proyecto añadido');
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('¿Deseas eliminar este proyecto del gestor?')) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      if (editingProjectId === id) setEditingProjectId(null);
      showNotification('Proyecto eliminado');
    }
  };

  // Editing Object State
  const currentEditingObject = objects.find((o) => o.id === editingObjectId);

  const handleUpdateObjectField = (field: keyof BespokeObject, value: any) => {
    if (!editingObjectId) return;
    setObjects((prev) =>
      prev.map((o) => (o.id === editingObjectId ? { ...o, [field]: value } : o))
    );
    showNotification('Objeto actualizado');
  };

  const handleAddNewObject = () => {
    const newObjId = `objeto-${Date.now()}`;
    const newObj: BespokeObject = {
      id: newObjId,
      name: 'Lámpara Totémica No. 01',
      category: 'Iluminación Escultural',
      dimensions: '45 × 45 × 160 cm',
      materials: 'Bloque de travertino y difusor de alabastro natural',
      edition: 'Serie de 8 unidades numeradas',
      year: new Date().getFullYear(),
      image: '/assets/images/bespoke_travertine_table_1790609047846.jpg',
      description: 'Columna de luz escultural para rincones de lectura y salones de alta altura libre.',
      availability: 'Edición limitada',
    };
    setObjects([...objects, newObj]);
    setEditingObjectId(newObjId);
    showNotification('Nuevo objeto de colección añadido');
  };

  const handleDeleteObject = (id: string) => {
    if (confirm('¿Deseas eliminar este objeto?')) {
      setObjects((prev) => prev.filter((o) => o.id !== id));
      if (editingObjectId === id) setEditingObjectId(null);
      showNotification('Objeto eliminado');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      
      {/* Background click to close */}
      <div className="flex-1" onClick={onClose} />

      {/* Main CMS Drawer Panel */}
      <div className="w-full max-w-2xl bg-[#FAF9F6] border-l border-[#DCD5C9] shadow-2xl flex flex-col h-full overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E3DCD0] bg-[#F2EFE8] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <h3 className="font-serif text-lg font-semibold text-[#1A1917]">
                Gestor de Contenidos · Studio CMS
              </h3>
            </div>
            <p className="text-[11px] text-[#6B655C]">
              Edición en tiempo real diseñada para el nicho de arquitectura interior
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onResetDefaults}
              className="p-1.5 text-xs text-[#706B62] hover:text-[#1A1917] hover:bg-[#EAE4D9] rounded flex items-center gap-1 cursor-pointer"
              title="Restablecer datos originales de muestra"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restaurar</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#544E45] hover:text-[#1A1917] hover:bg-[#EAE4D9] rounded cursor-pointer"
              aria-label="Cerrar gestor"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Notification Banner */}
        {notification && (
          <div className="bg-emerald-900 text-emerald-100 text-xs px-6 py-2 flex items-center justify-between animate-in slide-in-from-top duration-150">
            <span>{notification}</span>
            <Check className="w-3.5 h-3.5" />
          </div>
        )}

        {/* Navigation Tabs inside CMS */}
        <div className="px-6 pt-3 border-b border-[#E3DCD0] flex gap-4 text-xs overflow-x-auto bg-[#F6F4EE]">
          <button
            onClick={() => {
              setActiveTab('proyectos');
              setEditingProjectId(null);
            }}
            className={`pb-3 font-medium flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'proyectos'
                ? 'border-[#1A1917] text-[#1A1917]'
                : 'border-transparent text-[#736D63] hover:text-[#1A1917]'
            }`}
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span>Proyectos ({projects.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('objetos');
              setEditingObjectId(null);
            }}
            className={`pb-3 font-medium flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'objetos'
                ? 'border-[#1A1917] text-[#1A1917]'
                : 'border-transparent text-[#736D63] hover:text-[#1A1917]'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>Objetos & Muebles ({objects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('marca')}
            className={`pb-3 font-medium flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'marca'
                ? 'border-[#1A1917] text-[#1A1917]'
                : 'border-transparent text-[#736D63] hover:text-[#1A1917]'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Identidad & Textos</span>
          </button>

          <button
            onClick={() => setActiveTab('atmosfera')}
            className={`pb-3 font-medium flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'atmosfera'
                ? 'border-[#1A1917] text-[#1A1917]'
                : 'border-transparent text-[#736D63] hover:text-[#1A1917]'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Atmósfera Visual</span>
          </button>
        </div>

        {/* Scrollable CMS Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: PROYECTOS */}
          {activeTab === 'proyectos' && (
            <div>
              {editingProjectId && currentEditingProject ? (
                /* EDIT SINGLE PROJECT VIEW */
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between border-b border-[#E3DCD0] pb-3">
                    <button
                      onClick={() => setEditingProjectId(null)}
                      className="text-xs text-[#7A746A] hover:text-[#1A1917] flex items-center gap-1 cursor-pointer font-medium"
                    >
                      ← Volver a lista de proyectos
                    </button>
                    <span className="text-xs font-serif text-[#1A1917]">
                      Editando: {currentEditingProject.title}
                    </span>
                  </div>

                  {/* Form fields */}
                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block text-[#666057] uppercase tracking-wider mb-1 font-medium">
                        Título de la Obra
                      </label>
                      <input
                        type="text"
                        value={currentEditingProject.title}
                        onChange={(e) => handleUpdateProjectField('title', e.target.value)}
                        className="w-full bg-[#FFFFFF] border border-[#D5CEC0] rounded p-2 text-xs text-[#1A1917] focus:outline-none focus:border-[#1A1917]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#666057] uppercase tracking-wider mb-1 font-medium">
                        Subtítulo & Resumen
                      </label>
                      <input
                        type="text"
                        value={currentEditingProject.subtitle}
                        onChange={(e) => handleUpdateProjectField('subtitle', e.target.value)}
                        className="w-full bg-[#FFFFFF] border border-[#D5CEC0] rounded p-2 text-xs text-[#1A1917] focus:outline-none focus:border-[#1A1917]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#666057] uppercase tracking-wider mb-1 font-medium">
                          Tipología
                        </label>
                        <select
                          value={currentEditingProject.category}
                          onChange={(e) => handleUpdateProjectField('category', e.target.value as ProjectCategory)}
                          className="w-full bg-[#FFFFFF] border border-[#D5CEC0] rounded p-2 text-xs text-[#1A1917] focus:outline-none focus:border-[#1A1917]"
                        >
                          <option value="Residencial">Residencial</option>
                          <option value="Hospitality">Hospitality</option>
                          <option value="Retail">Retail</option>
                          <option value="Colección">Colección</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[#666057] uppercase tracking-wider mb-1 font-medium">
                          Estado
                        </label>
                        <select
                          value={currentEditingProject.status}
                          onChange={(e) => handleUpdateProjectField('status', e.target.value)}
                          className="w-full bg-[#FFFFFF] border border-[#D5CEC0] rounded p-2 text-xs text-[#1A1917] focus:outline-none focus:border-[#1A1917]"
                        >
                          <option value="Completado">Completado</option>
                          <option value="En Construcción">En Construcción</option>
                          <option value="Concepto">Concepto</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[#666057] uppercase tracking-wider mb-1 font-medium">
                          Ubicación
                        </label>
                        <input
                          type="text"
                          value={currentEditingProject.location}
                          onChange={(e) => handleUpdateProjectField('location', e.target.value)}
                          className="w-full bg-[#FFFFFF] border border-[#D5CEC0] rounded p-2 text-xs text-[#1A1917] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[#666057] uppercase tracking-wider mb-1 font-medium">
                          Año
                        </label>
                        <input
                          type="number"
                          value={currentEditingProject.year}
                          onChange={(e) => handleUpdateProjectField('year', Number(e.target.value))}
                          className="w-full bg-[#FFFFFF] border border-[#D5CEC0] rounded p-2 text-xs text-[#1A1917] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[#666057] uppercase tracking-wider mb-1 font-medium">
                          Superficie (m²)
                        </label>
                        <input
                          type="number"
                          value={currentEditingProject.areaM2}
                          onChange={(e) => handleUpdateProjectField('areaM2', Number(e.target.value))}
                          className="w-full bg-[#FFFFFF] border border-[#D5CEC0] rounded p-2 text-xs text-[#1A1917] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#666057] uppercase tracking-wider mb-1 font-medium">
                        Memoria Arquitectónica Detallada
                      </label>
                      <textarea
                        rows={3}
                        value={currentEditingProject.description}
                        onChange={(e) => handleUpdateProjectField('description', e.target.value)}
                        className="w-full bg-[#FFFFFF] border border-[#D5CEC0] rounded p-2 text-xs text-[#1A1917] focus:outline-none resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[#666057] uppercase tracking-wider mb-1 font-medium">
                        Concepto de Espacio (Cita Destacada)
                      </label>
                      <textarea
                        rows={2}
                        value={currentEditingProject.concept}
                        onChange={(e) => handleUpdateProjectField('concept', e.target.value)}
                        className="w-full bg-[#FFFFFF] border border-[#D5CEC0] rounded p-2 text-xs text-[#1A1917] focus:outline-none resize-none"
                      />
                    </div>

                    {/* Image selector */}
                    <div>
                      <label className="block text-[#666057] uppercase tracking-wider mb-1 font-medium">
                        Fotografía Principal (URL / Ruta interna)
                      </label>
                      <input
                        type="text"
                        value={currentEditingProject.coverImage}
                        onChange={(e) => handleUpdateProjectField('coverImage', e.target.value)}
                        className="w-full bg-[#FFFFFF] border border-[#D5CEC0] rounded p-2 text-xs text-[#1A1917] focus:outline-none font-mono"
                      />
                      <div className="mt-2 w-32 h-20 rounded overflow-hidden border border-[#D5CEC0]">
                        <img
                          src={currentEditingProject.coverImage}
                          alt="Previsualización"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-[#E3DCD0]">
                      <button
                        onClick={() => handleDeleteProject(currentEditingProject.id)}
                        className="text-red-700 hover:text-red-900 flex items-center gap-1 font-medium cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Eliminar Proyecto</span>
                      </button>

                      <button
                        onClick={() => setEditingProjectId(null)}
                        className="px-4 py-2 bg-[#1A1917] text-white rounded font-medium cursor-pointer"
                      >
                        Listo, Cerrar Edición
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* PROJECTS LIST VIEW */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-[#666057] font-medium">
                      Obras registradas en el catálogo
                    </span>
                    <button
                      onClick={handleAddNewProject}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#1A1917] hover:bg-[#332E28] rounded cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Nuevo Proyecto</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="p-3.5 bg-[#FFFFFF] border border-[#DCD5C9] rounded-md flex items-center justify-between gap-4 hover:border-[#1A1917] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={proj.coverImage}
                            alt={proj.title}
                            className="w-14 h-12 object-cover rounded border border-[#DDD6C8]"
                          />
                          <div>
                            <h4 className="font-serif text-sm text-[#1A1917] font-semibold">
                              {proj.title}
                            </h4>
                            <p className="text-[11px] text-[#736D63]">
                              {proj.category} · {proj.location} · {proj.areaM2} m²
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setEditingProjectId(proj.id)}
                            className="p-1.5 text-[#544E45] hover:text-[#1A1917] hover:bg-[#F2EFE8] rounded cursor-pointer"
                            title="Editar proyecto"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(proj.id)}
                            className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded cursor-pointer"
                            title="Eliminar proyecto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: OBJETOS & MUEBLES (Mas Creations structure) */}
          {activeTab === 'objetos' && (
            <div>
              {editingObjectId && currentEditingObject ? (
                /* EDIT OBJECT */
                <div className="space-y-4 text-xs">
                  <div className="flex items-center justify-between border-b border-[#E3DCD0] pb-3">
                    <button
                      onClick={() => setEditingObjectId(null)}
                      className="text-xs text-[#7A746A] hover:text-[#1A1917] flex items-center gap-1 cursor-pointer font-medium"
                    >
                      ← Volver a lista de objetos
                    </button>
                    <span className="font-serif text-[#1A1917] font-medium">
                      {currentEditingObject.name}
                    </span>
                  </div>

                  <div>
                    <label className="block text-[#666057] uppercase tracking-wider mb-1 font-medium">
                      Nombre de la Pieza
                    </label>
                    <input
                      type="text"
                      value={currentEditingObject.name}
                      onChange={(e) => handleUpdateObjectField('name', e.target.value)}
                      className="w-full bg-[#FFFFFF] border border-[#D5CEC0] rounded p-2 text-xs text-[#1A1917]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#666057] uppercase tracking-wider mb-1 font-medium">
                        Categoría
                      </label>
                      <input
                        type="text"
                        value={currentEditingObject.category}
                        onChange={(e) => handleUpdateObjectField('category', e.target.value)}
                        className="w-full bg-[#FFFFFF] border border-[#D5CEC0] rounded p-2 text-xs text-[#1A1917]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#666057] uppercase tracking-wider mb-1 font-medium">
                        Disponibilidad
                      </label>
                      <select
                        value={currentEditingObject.availability}
                        onChange={(e) => handleUpdateObjectField('availability', e.target.value)}
                        className="w-full bg-[#FFFFFF] border border-[#D5CEC0] rounded p-2 text-xs text-[#1A1917]"
                      >
                        <option value="Edición limitada">Edición limitada</option>
                        <option value="Disponible bajo pedido">Disponible bajo pedido</option>
                        <option value="Pieza única">Pieza única</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#666057] uppercase tracking-wider mb-1 font-medium">
                      Materiales
                    </label>
                    <input
                      type="text"
                      value={currentEditingObject.materials}
                      onChange={(e) => handleUpdateObjectField('materials', e.target.value)}
                      className="w-full bg-[#FFFFFF] border border-[#D5CEC0] rounded p-2 text-xs text-[#1A1917]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#666057] uppercase tracking-wider mb-1 font-medium">
                      Dimensiones & Medidas
                    </label>
                    <input
                      type="text"
                      value={currentEditingObject.dimensions}
                      onChange={(e) => handleUpdateObjectField('dimensions', e.target.value)}
                      className="w-full bg-[#FFFFFF] border border-[#D5CEC0] rounded p-2 text-xs text-[#1A1917]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#666057] uppercase tracking-wider mb-1 font-medium">
                      Descripción de la Pieza
                    </label>
                    <textarea
                      rows={3}
                      value={currentEditingObject.description}
                      onChange={(e) => handleUpdateObjectField('description', e.target.value)}
                      className="w-full bg-[#FFFFFF] border border-[#D5CEC0] rounded p-2 text-xs text-[#1A1917] resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-[#E3DCD0]">
                    <button
                      onClick={() => handleDeleteObject(currentEditingObject.id)}
                      className="text-red-700 hover:text-red-900 flex items-center gap-1 font-medium cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Eliminar Objeto</span>
                    </button>
                    <button
                      onClick={() => setEditingObjectId(null)}
                      className="px-4 py-2 bg-[#1A1917] text-white rounded font-medium cursor-pointer"
                    >
                      Listo, Cerrar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-[#666057] font-medium">
                      Mobiliario de autor & Objetos esculturales
                    </span>
                    <button
                      onClick={handleAddNewObject}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#1A1917] hover:bg-[#332E28] rounded cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Nuevo Objeto</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {objects.map((obj) => (
                      <div
                        key={obj.id}
                        className="p-3.5 bg-[#FFFFFF] border border-[#DCD5C9] rounded-md flex items-center justify-between gap-4 hover:border-[#1A1917] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={obj.image}
                            alt={obj.name}
                            className="w-14 h-12 object-cover rounded border border-[#DDD6C8]"
                          />
                          <div>
                            <h4 className="font-serif text-sm text-[#1A1917] font-semibold">
                              {obj.name}
                            </h4>
                            <p className="text-[11px] text-[#736D63]">
                              {obj.category} · {obj.availability}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setEditingObjectId(obj.id)}
                            className="p-1.5 text-[#544E45] hover:text-[#1A1917] hover:bg-[#F2EFE8] rounded cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteObject(obj.id)}
                            className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: IDENTIDAD & MARCA */}
          {activeTab === 'marca' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[#666057] uppercase tracking-wider mb-1 font-medium">
                  Nombre del Estudio / Atelier
                </label>
                <input
                  type="text"
                  value={studioConfig.studioName}
                  onChange={(e) => {
                    setStudioConfig({ ...studioConfig, studioName: e.target.value });
                    showNotification('Nombre de estudio actualizado');
                  }}
                  className="w-full bg-[#FFFFFF] border border-[#D5CEC0] rounded p-2 text-xs text-[#1A1917]"
                />
              </div>

              <div>
                <label className="block text-[#666057] uppercase tracking-wider mb-1 font-medium">
                  Tagline / Disciplina
                </label>
                <input
                  type="text"
                  value={studioConfig.tagline}
                  onChange={(e) => {
                    setStudioConfig({ ...studioConfig, tagline: e.target.value });
                    showNotification('Tagline actualizado');
                  }}
                  className="w-full bg-[#FFFFFF] border border-[#D5CEC0] rounded p-2 text-xs text-[#1A1917]"
                />
              </div>

              <div>
                <label className="block text-[#666057] uppercase tracking-wider mb-1 font-medium">
                  Monograma / Logotipo Central del Hero (Estilo Alexander & CO.)
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={studioConfig.heroMonogram || 'A&CO.'}
                    onChange={(e) => {
                      setStudioConfig({ ...studioConfig, heroMonogram: e.target.value });
                      showNotification('Monograma del Hero actualizado');
                    }}
                    placeholder="Ej. A&CO. o CHOROS."
                    className="flex-1 bg-[#FFFFFF] border border-[#D5CEC0] rounded p-2 text-xs font-serif font-medium text-[#1A1917]"
                  />
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setStudioConfig({ ...studioConfig, heroMonogram: 'A&CO.' });
                        showNotification('Monograma fijado en A&CO.');
                      }}
                      className="px-2 py-1 text-[10px] uppercase tracking-wider bg-[#F0EDE6] hover:bg-[#E4DFD5] text-[#2B2721] rounded border border-[#D5CEC0]"
                    >
                      A&CO.
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setStudioConfig({ ...studioConfig, heroMonogram: 'CHOROS.' });
                        showNotification('Monograma fijado en CHOROS.');
                      }}
                      className="px-2 py-1 text-[10px] uppercase tracking-wider bg-[#F0EDE6] hover:bg-[#E4DFD5] text-[#2B2721] rounded border border-[#D5CEC0]"
                    >
                      CHOROS.
                    </button>
                  </div>
                </div>
                <p className="text-[10px] text-[#7A7367] mt-1">
                  Texto serif monumental que flota en el centro del Hero a pantalla completa.
                </p>
              </div>

              <div>
                <label className="block text-[#666057] uppercase tracking-wider mb-1 font-medium">
                  Fotografía de Fondo del Banner Hero
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={studioConfig.heroBackgroundImage || ''}
                    onChange={(e) => {
                      setStudioConfig({ ...studioConfig, heroBackgroundImage: e.target.value });
                      showNotification('Fondo del banner actualizado');
                    }}
                    placeholder="URL de imagen o déjalo vacío para usar carrusel de obras"
                    className="flex-1 bg-[#FFFFFF] border border-[#D5CEC0] rounded p-2 text-xs text-[#1A1917]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setStudioConfig({ 
                        ...studioConfig, 
                        heroBackgroundImage: '/assets/images/olive_mineral_texture_1790628051119.jpg' 
                      });
                      showNotification('Foto verde oliva activada');
                    }}
                    className="px-2.5 py-1 text-[10px] uppercase tracking-wider bg-[#F0EDE6] hover:bg-[#E4DFD5] text-[#2B2721] rounded border border-[#D5CEC0] whitespace-nowrap"
                  >
                    Foto Verde Oliva
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setStudioConfig({ 
                        ...studioConfig, 
                        heroBackgroundImage: undefined 
                      });
                      showNotification('Carrusel de obras activado');
                    }}
                    className="px-2.5 py-1 text-[10px] uppercase tracking-wider bg-[#F0EDE6] hover:bg-[#E4DFD5] text-[#2B2721] rounded border border-[#D5CEC0] whitespace-nowrap"
                  >
                    Carrusel Obras
                  </button>
                </div>
                <p className="text-[10px] text-[#7A7367] mt-1">
                  Imagen principal a pantalla completa para el banner Hero.
                </p>
              </div>

              <div>
                <label className="block text-[#666057] uppercase tracking-wider mb-1 font-medium">
                  Titular Principal del Hero
                </label>
                <textarea
                  rows={2}
                  value={studioConfig.heroHeadline}
                  onChange={(e) => {
                    setStudioConfig({ ...studioConfig, heroHeadline: e.target.value });
                    showNotification('Titular actualizado');
                  }}
                  className="w-full bg-[#FFFFFF] border border-[#D5CEC0] rounded p-2 text-xs text-[#1A1917] resize-none"
                />
              </div>

              <div>
                <label className="block text-[#666057] uppercase tracking-wider mb-1 font-medium">
                  Manifiesto de Filosofía & Materialidad
                </label>
                <textarea
                  rows={4}
                  value={studioConfig.philosophyStatement}
                  onChange={(e) => {
                    setStudioConfig({ ...studioConfig, philosophyStatement: e.target.value });
                    showNotification('Filosofía actualizada');
                  }}
                  className="w-full bg-[#FFFFFF] border border-[#D5CEC0] rounded p-2 text-xs text-[#1A1917] resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#666057] uppercase tracking-wider mb-1 font-medium">
                    Email de Contacto
                  </label>
                  <input
                    type="email"
                    value={studioConfig.email}
                    onChange={(e) => setStudioConfig({ ...studioConfig, email: e.target.value })}
                    className="w-full bg-[#FFFFFF] border border-[#D5CEC0] rounded p-2 text-xs text-[#1A1917]"
                  />
                </div>

                <div>
                  <label className="block text-[#666057] uppercase tracking-wider mb-1 font-medium">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    value={studioConfig.phone}
                    onChange={(e) => setStudioConfig({ ...studioConfig, phone: e.target.value })}
                    className="w-full bg-[#FFFFFF] border border-[#D5CEC0] rounded p-2 text-xs text-[#1A1917]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ATMÓSFERA VISUAL & CONCEPTO DE DISEÑO */}
          {activeTab === 'atmosfera' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-serif text-base text-[#1A1917] mb-2 font-medium">
                  Concepto Arquitectónico de la Web
                </h4>
                <p className="text-xs text-[#6B655B] leading-relaxed mb-3">
                  Selecciona la dirección estética principal de la web. Puedes alternar entre la visión sensorial de Studio Choros y el híbrido equilibrado.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <button
                    onClick={() => {
                      setStudioConfig({
                        ...studioConfig,
                        activeDesign: 'choros',
                      });
                      showNotification('Diseño cambiado a Studio Choros (Sensorial)');
                    }}
                    className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer ${
                      studioConfig.activeDesign === 'choros'
                        ? 'border-[#8A7149] bg-[#F4F1EA] shadow-xs ring-1 ring-[#8A7149]'
                        : 'border-[#DDD7CD] bg-white hover:border-[#BBB3A4]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-sm text-[#1F1D1A] font-medium">
                        Studio Choros (Prevalente)
                      </span>
                      {studioConfig.activeDesign === 'choros' && (
                        <span className="text-[10px] bg-[#8A7149] text-white px-2 py-0.5 rounded">Activo</span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#6E6659] leading-snug">
                      Énfasis en poesía espacial, arcos, luz solar interactiva, monografías y texturas de cal y piedra viva.
                    </p>
                  </button>

                  <button
                    onClick={() => {
                      setStudioConfig({
                        ...studioConfig,
                        activeDesign: 'hybrid',
                      });
                      showNotification('Diseño cambiado a Atelier Híbrido');
                    }}
                    className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer ${
                      studioConfig.activeDesign === 'hybrid'
                        ? 'border-[#8A7149] bg-[#F4F1EA] shadow-xs ring-1 ring-[#8A7149]'
                        : 'border-[#DDD7CD] bg-white hover:border-[#BBB3A4]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-sm text-[#1F1D1A] font-medium">
                        Atelier Híbrido
                      </span>
                      {studioConfig.activeDesign === 'hybrid' && (
                        <span className="text-[10px] bg-[#8A7149] text-white px-2 py-0.5 rounded">Activo</span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#6E6659] leading-snug">
                      Estructura Bento de Mas Creations combinada con el índice técnico y simplicidad de Alexander &CO.
                    </p>
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-serif text-base text-[#1A1917] mb-2 font-medium">
                  Paleta de Atmósfera del Sitio
                </h4>
                <p className="text-xs text-[#6B655B] leading-relaxed">
                  Permite al estudio alternar instantáneamente la temperatura cromática de la web según la estación o la colección en curso.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {[
                  {
                    id: 'olive',
                    name: 'Verde Oliva & Papiro Mineral (Activo)',
                    desc: 'Textura mineral verde oliva profundo (#4E5537) con grano artesanal de papel botánico y contrastes en blanco hueso.',
                    bg: '#4E5537',
                    border: '#3F462C',
                  },
                  {
                    id: 'limestone',
                    name: 'Caliza & Travertino',
                    desc: 'Tono piedra natural cálido (#F8F7F4) inspirado en Studio Choros.',
                    bg: '#F8F7F4',
                    border: '#D8D4CC',
                  },
                  {
                    id: 'travertine',
                    name: 'Arena Soleada',
                    desc: 'Ligeramente más dorado y cálido (#FAF7EE) con contrastes terracota.',
                    bg: '#FAF7EE',
                    border: '#DFD8C4',
                  },
                  {
                    id: 'noir',
                    name: 'Carbón Minimalista',
                    desc: 'Atmósfera sobria de galería de arte contemporánea (#F4F4F4 con acentos de pizarra).',
                    bg: '#F2F2F2',
                    border: '#D0D0D0',
                  },
                ].map((atm) => (
                  <button
                    key={atm.id}
                    onClick={() => {
                      setStudioConfig({
                        ...studioConfig,
                        themeAtmosphere: atm.id as any,
                      });
                      showNotification(`Atmósfera cambiada a ${atm.name}`);
                    }}
                    className={`p-4 rounded-md border text-left flex items-start gap-4 transition-all cursor-pointer ${
                      studioConfig.themeAtmosphere === atm.id
                        ? 'border-[#1A1917] bg-[#EFECE5] shadow-xs'
                        : 'border-[#DDD7CD] bg-[#FFFFFF] hover:border-[#BBB3A4]'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded border shrink-0"
                      style={{ backgroundColor: atm.bg, borderColor: atm.border }}
                    />
                    <div>
                      <span className="font-medium text-xs text-[#1A1917] block">
                        {atm.name}
                      </span>
                      <span className="text-[11px] text-[#736D63] block">
                        {atm.desc}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer info in CMS */}
        <div className="p-4 border-t border-[#E3DCD0] bg-[#F2EFE8] flex items-center justify-between text-xs text-[#7A746B]">
          <span>CMS optimizado para estudios de arquitectura & diseño interior</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#1A1917] text-white rounded text-xs font-medium cursor-pointer"
          >
            Ver Cambios en la Web
          </button>
        </div>

      </div>
    </div>
  );
};
