import React from 'react'
import {Story, Area, makeEmptyStory} from '../stores/TreeStoreSchema';
import StoryList from './StoryList';
import {observer} from 'mobx-react';

export interface AreaProps extends Area {
  onClick: ()=> void
  addStory: (s: Story)=> void
  onRemoveClick: ()=>void
  isCollapsed: boolean
}

const S1 = makeEmptyStory();
const S2 = makeEmptyStory();
const S3 = makeEmptyStory();

const AreaComponent: React.SFC<AreaProps> = ({ id, name, childIds: storyIds, isCollapsed, onClick, addStory, onRemoveClick}) => (
  <li
    onClick={e=>{e.stopPropagation(); onClick()}}
    style={{
      listStyleType: isCollapsed ? 'disc':'circle'
    }}
  >
    {`${id} : ${name} : ${0}`}
    <button onClick={e=>{e.stopPropagation(); addStory(makeEmptyStory())}}>+</button>    
    <button onClick={e=>{e.stopPropagation(); onRemoveClick()}}>-</button>   
    <button onClick={e=>{e.stopPropagation(); addStory(S1)}}>S1</button>&nbsp;
    <button onClick={e=>{e.stopPropagation(); addStory(S2)}}>S2</button>&nbsp;
    <button onClick={e=>{e.stopPropagation(); addStory(S3)}}>S3</button>&nbsp;
    {!isCollapsed && <StoryList storyIds={storyIds} areaId={id}/>}
  </li>
)

export default observer(AreaComponent)
