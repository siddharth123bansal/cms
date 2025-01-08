import React, { JSX, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'

// Define types for the draggable block and layout container
interface DraggableBlockProps {
  id: string
  type: string
}

interface LayoutContainerProps {
  index: number
  addItem: (item: DraggableBlockProps, containerIndex: number) => void
  removeItem: (containerIndex: number) => JSX.Element[]
}

interface LayoutItem {
  id: string
  type: string
}

interface LayoutContainerState {
  id: string
  items: LayoutItem[]
}

const DraggableBlock: React.FC<DraggableBlockProps> = ({ id, type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'BLOCK',
    item: { id, type },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  }))

  return (
    <div
      ref={drag as any}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        padding: '10px',
        backgroundColor: '#f0f0f0',
        margin: '5px',
        borderRadius: '4px'
      }}
    >
      {type}
    </div>
  )
}

const LayoutContainer: React.FC<LayoutContainerProps> = ({
  index,
  addItem,
  removeItem
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'BLOCK',
    drop: (item: DraggableBlockProps) => {
      addItem(item, index)
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  }))

  return (
    <div
      ref={drop as any}
      style={{
        width: '100%',
        minHeight: '200px',
        backgroundColor: isOver ? '#e0f7fa' : '#f9f9f9',
        padding: '10px',
        borderRadius: '6px',
        border: '2px dashed #ccc',
        margin: '10px 0'
      }}
    >
      <h4>Layout Container {index + 1}</h4>
      <div>{removeItem && removeItem(index)}</div>
    </div>
  )
}

const LayoutEditor: React.FC = () => {
  // Initial state for layout (array of containers with items inside them)
  const [layout, setLayout] = useState<LayoutContainerState[]>([
    { id: 'container1', items: [] },
    { id: 'container2', items: [] }
  ])

  // Add item to a specific container in the layout
  const addItemToContainer = (
    item: DraggableBlockProps,
    containerIndex: number
  ) => {
    const newLayout = [...layout]
    newLayout[containerIndex].items.push(item)
    setLayout(newLayout)
  }

  // Remove item from a container in the layout
  const removeItemFromContainer = (
    containerIndex: number,
    itemIndex: number
  ) => {
    const newLayout = [...layout]
    newLayout[containerIndex].items.splice(itemIndex, 1)
    setLayout(newLayout)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '20px'
      }}
    >
      <div>
        <h3>Draggable Elements (Drag to containers)</h3>
        <div>
          <DraggableBlock id="1" type="Text" />
          <DraggableBlock id="2" type="Image" />
          <DraggableBlock id="3" type="Video" />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        {layout.map((container, index) => (
          <LayoutContainer
            key={container.id}
            index={index}
            addItem={addItemToContainer}
            removeItem={index =>
              container.items.map((item, i) => (
                <div
                  key={i}
                  style={{
                    marginTop: '10px',
                    padding: '8px',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '4px'
                  }}
                >
                  {item.type}{' '}
                  <button
                    onClick={() => removeItemFromContainer(index, i)}
                    style={{
                      marginLeft: '10px',
                      padding: '2px 6px',
                      backgroundColor: '#ff4d4d',
                      border: 'none',
                      color: '#fff',
                      cursor: 'pointer',
                      borderRadius: '4px'
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))
            }
          />
        ))}
      </div>
    </div>
  )
}
export default LayoutEditor
