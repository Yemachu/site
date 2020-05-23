import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { Type as MonsterType, actions } from "../models/MonsterType";

import {
	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails,
	ExpansionPanelActions,
	TextField,
	FormControlLabel,
	Checkbox,
	List,
	ListItem,
	Grid,
	Button,
	IconButton,
	Divider,
	NoSsr,

} from "@material-ui/core";

import { Autocomplete } from "@material-ui/lab";

import {
	DragDropContext,
	Draggable,
	Droppable,
} from "react-beautiful-dnd";

import {
	ExpandMore as ExpandMoreIcon,
	Delete as DeleteIcon,
	DragIndicator as DragIndicatorIcon,

} from "@material-ui/icons";

interface MonsterTypeProvider
{
	readonly monsterType: MonsterType;
}

const defaultTypes = [
	"Aqua",
	"Beast",
	"Beast-Warrior",
	"Cyberse",
	"Dinosaur",
	"Divine-Beast",
	"Dragon",
	"Fairy",
	"Fiend",
	"Fish",
	"Insect",
	"Machine",
	"Plant",
	"Psychic",
	"Pyro",
	"Reptile",
	"Rock",
	"Sea Serpent",
	"Spellcaster",
	"Thunder",
	"Warrior",
	"Winged Beast",
	"Wyrm",
	"Zombie",
];



export default function MonsterTypeEditor(): JSX.Element
{
	const dispatch = useDispatch();
	const value = useSelector<MonsterTypeProvider, MonsterType>(state => state.monsterType);

	const { t } = useTranslation();
	const autoCompleteOptions = React.useMemo(function()
	{
		return defaultTypes.map((option) => t(option, {defaultValue: option}));
	}, [t]);

	return React.useMemo(function(){
		return <ExpansionPanel>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<FormControlLabel 
					control={
						<Checkbox
							checked={value.enabled}
							onChange={(evt) => {
								dispatch(evt.target.checked ? actions.enable() : actions.disable());
							}}
						/>
					}
					label="Monster type"
					/>
			</ExpansionPanelSummary>

			<NoSsr>
				<ExpansionPanelDetails>
					<Grid container>
						<Grid item xs={12}>
							<DragDropContext onDragEnd={()=>{}}>
								<Droppable droppableId="ygo:monster-types">
									{
										provided => <List {...provided.droppableProps} ref={provided.innerRef}>
											{["Dragon", "Synchro", "Tuner", "Effect"].map((item, index) => <Draggable key={item} index={index} draggableId={item}>
													{
														(provided) => <ListItem {...provided.draggableProps} ref={provided.innerRef}>
															<Grid container spacing={2} alignItems="center">
																<Grid item>
																	<span {...provided.dragHandleProps}>
																		<DragIndicatorIcon />
																	</span>
																</Grid>
																<Grid item xs>
																	<Autocomplete 
																		value={item} 
																		options={autoCompleteOptions}
																		size="small"
																		fullWidth
																		freeSolo
																		renderInput={(params) => <TextField {...params} variant="outlined"/>}
																	/>
																</Grid>
																<Grid item>
																	<IconButton size="small">
																		<DeleteIcon />
																	</IconButton>
																</Grid>
															</Grid>
														</ListItem>
													}
												</Draggable>)}
												
												{provided.placeholder}
										</List>
									}
								</Droppable>
							</DragDropContext>

						</Grid>
					</Grid>
				</ExpansionPanelDetails>
				<Divider />
				<ExpansionPanelActions>
					<Button size="small" color="primary" onClick={()=>{dispatch(actions.add());}}>Add</Button>
					<Button size="small" color="primary" onClick={()=>{dispatch(actions.reset());}}>Reset</Button>
			</ExpansionPanelActions>
			</NoSsr>
		</ExpansionPanel>
	}, [value, dispatch]);

}
