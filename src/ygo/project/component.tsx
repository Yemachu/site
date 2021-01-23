import React, { useState, useCallback } from "react";
import { Droppable, DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { 
  Avatar, 
  Badge, 
  IconButton,
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  ListItemIcon, 
  ListItemSecondaryAction, 
  Typography,
} from "@material-ui/core";
import { Add as AddIcon, Delete as DeleteIcon } from "@material-ui/icons";

import { Card } from "../card";
import { Attribute } from "../card/attribute";
import { project } from "./model";
import { add, reorder, select, remove } from "./actions";

type ProjectElementProps = {
  readonly card: Card;
}

const AttributeFallback = ({card}: ProjectElementProps): JSX.Element =>
{
  switch(card.attribute)
  {
    case Attribute.DARK: return <>闇</>;
    case Attribute.DIVINE: return <>神</>;
    case Attribute.EARTH: return <>㆞</>;
    case Attribute.FIRE: return <>炎</>;
    case Attribute.LIGHT: return <>光</>;
    case Attribute.WATER: return <>水</>;
    case Attribute.WIND: return <>風</>;
    case Attribute.SPELL: return <>魔</>;
    case Attribute.TRAP: return <>罠</>;
  }
  return <></>
}

const ProjectElement = ({card}: ProjectElementProps): JSX.Element =>
{
  return <>
    <ListItemAvatar>
      <Badge badgeContent={card.level.value} anchorOrigin={{vertical: "bottom", horizontal: "right"}} color="primary" overlap="circle">
        <Avatar>
          <AttributeFallback card={card} />
        </Avatar>
      </Badge>
    </ListItemAvatar>
    <ListItemText primary={<Typography noWrap>{card.name}</Typography>} />
    <ListItemSecondaryAction>
      <IconButton edge="end">
        <DeleteIcon />
      </IconButton>
    </ListItemSecondaryAction>
  </>
}

export const Project = () =>
{
  const state = useSelector<any, ReturnType<typeof project>>(state => state);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const handleDrop = useCallback(({ source, destination }: DropResult) => {
    // The project editor does not support moving data from other
    // sources, so those get filtered out.
    if (source.droppableId != destination?.droppableId) return;
    dispatch(reorder(source.index, destination.index));
  }, [dispatch]);

  return <>
    <List>
      <ListItem button onClick={()=>dispatch(add(Date.now().toString()))}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Add"/>
      </ListItem>
    </List>
    <DragDropContext onDragEnd={handleDrop}>
      <Droppable droppableId=":ygo-project" children={(provided, snapshot) => 
      {
        return <List {...provided.droppableProps} ref={provided.innerRef}>
          {state.order.map((id, i) => {
            const card = state.cards[id];
            return <Draggable draggableId={id} key={id} index={i}>
            {
              (provided) => <ListItem 
                {...provided.draggableProps} 
                {...provided.dragHandleProps} 
                button 
                onClick={() => dispatch(select(id))}
                ref={provided.innerRef}
                selected={id === state.selected}
              >
                <ProjectElement card={card} />
              </ListItem>
            }
            </Draggable>
          })}
          {provided.placeholder}
        </List>
      }}/>
    </DragDropContext>
  </>
}