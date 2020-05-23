import * as React from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { default as NumberFormat } from "react-number-format";

import { Card, Image } from "../models";
import { actions } from "../models/Image";

import {
	Button,
	
	Divider,

	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails,
	ExpansionPanelActions,

	Grid,

	NoSsr,

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
			const reader = new FileReader();
			reader.addEventListener("load", function(){
				const result = reader.result;
				if (typeof result === "string")
				{
					dispatch(actions.set(result));
				}
			});
			reader.readAsDataURL(acceptedFiles[0]);
		}
	});

	return React.useMemo(function(){
		return <ExpansionPanel>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<Typography>Image</Typography>
			</ExpansionPanelSummary>
			<NoSsr>

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
								size="small"
								variant="outlined"
								fullWidth
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								value={value.region.y}
								label={t("ygo:ui.image.Y", { defaultValue: "Y" })}
								onChange={(evt) => {
								}}
								size="small"
								type="number"
								fullWidth
								variant="outlined"
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								value={value.region.width}
								label={t("ygo:ui.image.Width", { defaultValue: "Width" })}
								onChange={(evt) => {
								}}
								size="small"
								type="number"
								fullWidth
								variant="outlined"
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								fullWidth
								value={value.region.height}
								label={t("ygo:ui.image.Height", { defaultValue: "Height" })}
								onChange={(evt) => {
									dispatch(actions.crop({...value.region, height: Number(evt.target.value)}))
								}}
								size="small"
								type="number"
								variant="outlined"

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
			</NoSsr>
		</ExpansionPanel>
	}, [value, dispatch, t, getRootProps, getInputProps, isDragActive]);

}