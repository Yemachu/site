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

interface NumberFormatterProps
{
	readonly inputRef: (instance: NumberFormat | null) => void;
	readonly onChange: (event: { target: { value: string } }) => void;
}

function NumberFormatter({ inputRef, onChange, ...other}: NumberFormatterProps): JSX.Element
{
	return <NumberFormat
		{...other}
		getInputRef={inputRef}
		onValueChange={values => {
			onChange({ target: { value: values.floatValue } });
		}}
		isNumericString
	/>
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
								value={value.region.left}
								label={t("ygo:ui.image.Left", { defaultValue: "Left" })}
								onChange={(evt) => {
									dispatch(actions.crop({ ...value.region, left: Number(evt.target.value) }));
								}}
								size="small"
								fullWidth
								InputProps={{
									inputComponent: NumberFormatter as any
								}}
								variant="outlined"
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								value={value.region.right}
								label={t("ygo:ui.image.Right", { defaultValue: "Right" })}
								onChange={(evt) => {
									dispatch(actions.crop({ ...value.region, right: Number(evt.target.value) }));
								}}
								size="small"
								fullWidth
								InputProps={{
									inputComponent: NumberFormatter as any
								}}
								variant="outlined"
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								value={value.region.top}
								label={t("ygo:ui.image.Top", { defaultValue: "Top" })}
								onChange={(evt) => {
									dispatch(actions.crop({ ...value.region, top: Number(evt.target.value) }));
								}}
								size="small"
								fullWidth
								InputProps={{
									inputComponent: NumberFormatter as any
								}}
								variant="outlined"
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								fullWidth
								value={value.region.bottom}
								label={t("ygo:ui.image.Bottom", { defaultValue: "Bottom" })}
								onChange={(evt) => {
									dispatch(actions.crop({...value.region, bottom: Number(evt.target.value)}))
								}}
								size="small"
								InputProps={{
									inputComponent: NumberFormatter as any
								}}
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