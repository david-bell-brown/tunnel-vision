import {createSlice} from '@reduxjs/toolkit'

import {addEntity, removeEntity} from './entity'

const createComponent = (name, defaults={}) => {
  const addAction = (state, id, data) => {
    return [...state, {id, ...defaults, ...data}]
  }
  const removeAction = (state, id) => {
    return state.filter(c => c.id !== id)
  }
  let component = createSlice({
    name,
    initialState: [],
    reducers: {
      add: (state, action) => {
        const {id, data} = action.payload
        return addAction(state, id, data)
      },
      remove: (state, action) => {
        const id = action.payload.id
        return removeAction(state, id)
      }
    },
    extraReducers: {
      [addEntity]: (state, action) => {
        const {id, components} = action.payload
        if (components[name]) {
          return addAction(state, id, components[name])
        }
      },
      [removeEntity]: (state, action) => {
        return removeAction(state, action.payload.id)
      }
    }
  })
  component.toString = () => `${name}`
  return component
}
export default createComponent;