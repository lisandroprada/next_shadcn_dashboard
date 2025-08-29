import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Property, PropertyImage } from '@/types/property.schema';
import { Plus, X, Star, Upload, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

interface ImagesTabProps {
  property: Partial<Property>;
  onPropertyChange: (field: keyof Property, value: any) => void;
}

export function ImagesTab({ property, onPropertyChange }: ImagesTabProps) {
  const [newImage, setNewImage] = useState<Partial<PropertyImage>>({
    name: '',
    thumb: '',
    thumbWeb: '',
    imgSlider: '',
    title: '',
    description: ''
  });

  const addImage = () => {
    if (newImage.name && newImage.thumbWeb) {
      const images = [
        ...(property.img || []),
        {
          ...newImage,
          createdAt: new Date()
        } as PropertyImage
      ];
      onPropertyChange('img', images);
      setNewImage({
        name: '',
        thumb: '',
        thumbWeb: '',
        imgSlider: '',
        title: '',
        description: ''
      });
    }
  };

  const updateImage = (
    index: number,
    field: keyof PropertyImage,
    value: any
  ) => {
    const images = [...(property.img || [])];
    images[index] = { ...images[index], [field]: value };
    onPropertyChange('img', images);
  };

  const removeImage = (index: number) => {
    const images = (property.img || []).filter((_, i) => i !== index);
    onPropertyChange('img', images);
  };

  const setCoverImage = (index: number) => {
    const image = property.img?.[index];
    if (image) {
      onPropertyChange('imgCover', {
        name: image.name,
        thumbWeb: image.thumbWeb,
        createdAt: new Date()
      });
    }
  };

  const isCoverImage = (index: number) => {
    const image = property.img?.[index];
    return image && property.imgCover?.name === image.name;
  };

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Agregar Nueva Imagen</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='imageName'>Nombre del archivo</Label>
              <Input
                id='imageName'
                value={newImage.name || ''}
                onChange={(e) =>
                  setNewImage((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder='imagen001.jpg'
              />
            </div>
            <div>
              <Label htmlFor='imageTitle'>Título</Label>
              <Input
                id='imageTitle'
                value={newImage.title || ''}
                onChange={(e) =>
                  setNewImage((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder='Título descriptivo'
              />
            </div>
          </div>

          <div className='grid grid-cols-3 gap-4'>
            <div>
              <Label htmlFor='thumbWeb'>URL Miniatura Web</Label>
              <Input
                id='thumbWeb'
                value={newImage.thumbWeb || ''}
                onChange={(e) =>
                  setNewImage((prev) => ({ ...prev, thumbWeb: e.target.value }))
                }
                placeholder='https://...'
              />
            </div>
            <div>
              <Label htmlFor='thumb'>URL Miniatura</Label>
              <Input
                id='thumb'
                value={newImage.thumb || ''}
                onChange={(e) =>
                  setNewImage((prev) => ({ ...prev, thumb: e.target.value }))
                }
                placeholder='https://...'
              />
            </div>
            <div>
              <Label htmlFor='imgSlider'>URL Slider</Label>
              <Input
                id='imgSlider'
                value={newImage.imgSlider || ''}
                onChange={(e) =>
                  setNewImage((prev) => ({
                    ...prev,
                    imgSlider: e.target.value
                  }))
                }
                placeholder='https://...'
              />
            </div>
          </div>

          <div>
            <Label htmlFor='imageDescription'>Descripción</Label>
            <Textarea
              id='imageDescription'
              value={newImage.description || ''}
              onChange={(e) =>
                setNewImage((prev) => ({
                  ...prev,
                  description: e.target.value
                }))
              }
              placeholder='Descripción de la imagen'
            />
          </div>

          <div className='flex gap-2'>
            <Button
              onClick={addImage}
              disabled={!newImage.name || !newImage.thumbWeb}
            >
              <Plus className='mr-2 h-4 w-4' />
              Agregar Imagen
            </Button>
            <Button variant='outline'>
              <Upload className='mr-2 h-4 w-4' />
              Subir Archivo
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <ImageIcon className='h-5 w-5' />
            Galería de Imágenes ({property.img?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {property.img && property.img.length > 0 ? (
            <div className='space-y-4'>
              {property.img.map((image, index) => (
                <div key={index} className='space-y-3 rounded-lg border p-4'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <span className='font-medium'>{image.name}</span>
                      {isCoverImage(index) && (
                        <Badge
                          variant='secondary'
                          className='flex items-center gap-1'
                        >
                          <Star className='h-3 w-3 fill-current' />
                          Portada
                        </Badge>
                      )}
                    </div>
                    <div className='flex gap-2'>
                      {!isCoverImage(index) && (
                        <Button
                          onClick={() => setCoverImage(index)}
                          size='sm'
                          variant='outline'
                        >
                          <Star className='h-4 w-4' />
                        </Button>
                      )}
                      <Button
                        onClick={() => removeImage(index)}
                        size='sm'
                        variant='destructive'
                      >
                        <X className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <Label>Título</Label>
                      <Input
                        value={image.title}
                        onChange={(e) =>
                          updateImage(index, 'title', e.target.value)
                        }
                        placeholder='Título de la imagen'
                      />
                    </div>
                    <div>
                      <Label>Descripción</Label>
                      <Input
                        value={image.description}
                        onChange={(e) =>
                          updateImage(index, 'description', e.target.value)
                        }
                        placeholder='Descripción'
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-3 gap-4'>
                    <div>
                      <Label>URL Web</Label>
                      <Input
                        value={image.thumbWeb}
                        onChange={(e) =>
                          updateImage(index, 'thumbWeb', e.target.value)
                        }
                        placeholder='URL miniatura web'
                      />
                    </div>
                    <div>
                      <Label>URL Miniatura</Label>
                      <Input
                        value={image.thumb}
                        onChange={(e) =>
                          updateImage(index, 'thumb', e.target.value)
                        }
                        placeholder='URL miniatura'
                      />
                    </div>
                    <div>
                      <Label>URL Slider</Label>
                      <Input
                        value={image.imgSlider}
                        onChange={(e) =>
                          updateImage(index, 'imgSlider', e.target.value)
                        }
                        placeholder='URL slider'
                      />
                    </div>
                  </div>

                  {image.thumbWeb && (
                    <div className='flex justify-center'>
                      <img
                        src={image.thumbWeb}
                        alt={image.title || image.name}
                        className='max-h-32 max-w-xs rounded border object-cover'
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className='text-muted-foreground py-12 text-center'>
              <ImageIcon className='mx-auto mb-4 h-12 w-12 opacity-50' />
              <p>No hay imágenes agregadas</p>
              <p className='text-sm'>
                Agrega imágenes para mejorar la presentación de la propiedad
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
