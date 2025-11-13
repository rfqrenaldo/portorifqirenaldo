import React, { useState } from "react"
import { Modal, IconButton, Box, Fade, Backdrop, Zoom, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import FullscreenIcon from "@mui/icons-material/Fullscreen"
import { Award, Eye } from "lucide-react"

const Certificate = ({ ImgSertif, Title, TechStack }) => {
	const [open, setOpen] = useState(false)

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
			{/* Certificate Image */}
			<div className="relative overflow-hidden">
				<div className="aspect-[4/3] overflow-hidden">
					<img
						src={ImgSertif}
						alt={Title || "Certificate"}
						className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 cursor-pointer"
						onClick={handleOpen}
					/>
				</div>
				
				{/* Hover Overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer" onClick={handleOpen}>
					<div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
						<Eye className="w-8 h-8 mx-auto mb-2" />
						<p className="text-sm font-medium">View Certificate</p>
					</div>
				</div>
			</div>

			{/* Certificate Details */}
			<div className="p-4 space-y-3">
				{/* Title */}
				<div className="flex items-start gap-3">
					<div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
						<Award className="w-4 h-4 text-purple-400" />
					</div>
					<div className="flex-1 min-w-0">
						<h3 className="text-white font-semibold text-sm leading-tight group-hover:text-purple-300 transition-colors duration-300">
							{Title || "Professional Certificate"}
						</h3>
					</div>
				</div>

				{/* Tech Stack */}
				{TechStack && TechStack.length > 0 && (
					<div className="space-y-2">
						<p className="text-xs text-slate-400 font-medium">Technologies:</p>
						<div className="flex flex-wrap gap-1.5">
							{TechStack.map((tech, index) => (
								<span
									key={index}
									className="text-xs bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 px-2 py-1 rounded-md border border-purple-500/20 group-hover:border-purple-400/30 transition-colors duration-300"
								>
									{tech}
								</span>
							))}
						</div>
					</div>
				)}
			</div>
			{/* Modal */}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 300,
					sx: {
						backgroundColor: "rgba(0, 0, 0, 0.9)",
						backdropFilter: "blur(5px)",
					},
				}}
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					margin: 0,
					padding: 0,
					"& .MuiBackdrop-root": {
						backgroundColor: "rgba(0, 0, 0, 0.9)",
					},
				}}>
				<Box
					sx={{
						position: "relative",
						width: "auto",
						maxWidth: "90vw",
						maxHeight: "90vh",
						m: 0,
						p: 0,
						outline: "none",
						"&:focus": {
							outline: "none",
						},
					}}>
					{/* Close Button */}
					<IconButton
						onClick={handleClose}
						sx={{
							position: "absolute",
							right: 16,
							top: 16,
							color: "white",
							bgcolor: "rgba(0,0,0,0.6)",
							zIndex: 1,
							padding: 1,
							"&:hover": {
								bgcolor: "rgba(0,0,0,0.8)",
								transform: "scale(1.1)",
							},
						}}
						size="large">
						<CloseIcon sx={{ fontSize: 24 }} />
					</IconButton>

					{/* Modal Image */}
					<img
						src={ImgSertif}
						alt="Certificate Full View"
						style={{
							display: "block",
							maxWidth: "100%",
							maxHeight: "90vh",
							margin: "0 auto",
							objectFit: "contain",
						}}
					/>
				</Box>
			</Modal>
		</div>
	)
}

export default Certificate
