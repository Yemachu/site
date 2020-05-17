import * as React from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { Card, Image } from "../models";
import { actions } from "../models/Image";

import {
	Button,

	Checkbox,

	Divider,

	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails,
	ExpansionPanelActions,

	FormControlLabel,

	Grid,

	Paper,

	TextField,
	Typography,

} from "@material-ui/core";

import {
	CloudUpload as UploadIcon,
	ExpandMore as ExpandMoreIcon,

} from "@material-ui/icons";


function stopPropagation(e: React.MouseEvent | React.FocusEvent): void {
	e.stopPropagation();
}

export default function ImageEditor(): JSX.Element {
	const dispatch = useDispatch();
	const value = useSelector<Card, Image>(card => card.image);

	const { t } = useTranslation();
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: "image/*",
		multiple: false,
		onDropAccepted: (acceptedFiles: File[]) => {
			dispatch(actions.set(URL.createObjectURL(acceptedFiles[0])));
		}
	});

	return React.useMemo(function(){
		return <ExpansionPanel>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<FormControlLabel
					control={<Checkbox />}
					label="Image"
					onClick={stopPropagation}
					onFocus={stopPropagation}
				/>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<Grid container spacing={2}>
					<Grid item xs={12}>

						<Paper {...getRootProps()} style={{textAlign: "center"}}>
							<input {...getInputProps()} />
							<Grid container spacing={2}>
								<Grid item xs={12}>
									{
										isDragActive
										? <Typography>Drop your image</Typography>
										: <Typography>Drag and drop an image here</Typography>
									}
								</Grid>
								<Grid item xs={12}>
									{
										value.url
										? <img src={value.url} alt="Uploaded image" style={{maxWidth: "100%"}} />
										: <UploadIcon />
									}
									
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label={t("ygo:ui.image.X", { defaultValue: "X" })}
							type="number"
							fullWidth
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label={t("ygo:ui.image.Y", { defaultValue: "Y" })}
							type="number"
							fullWidth
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label={t("ygo:ui.image.Width", { defaultValue: "Width" })}
							type="number"
							fullWidth
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label={t("ygo:ui.image.Height", { defaultValue: "Height" })}
							type="number"
							fullWidth
						/>
					</Grid>
				</Grid>
			</ExpansionPanelDetails>
			<Divider/>
			<ExpansionPanelActions>
				<Button 
					color="primary"
					onClick={()=>{dispatch({type: ""});}}
					size="small"
				>
					Reset
				</Button>
			</ExpansionPanelActions>
		</ExpansionPanel>
	}, [value, dispatch, t, getRootProps, getInputProps, isDragActive]);

}