import React from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  DialogActions,
  Grid,
  Typography,
  Tooltip
} from "@material-ui/core";
import {
    Close, LocationOnOutlined,
    NotesOutlined, DeleteOutlineOutlined,
    Edit
} from "@material-ui/icons";

import styles from "./style.css";

const spacer = (top, bottom) => ({
  margin: `${top}px 0 ${bottom}px 0`
});

const CurrentScheduleDialog = ({
    schedule: { item, isDialogOpen },
    closeDialog,
    editItem,
    deleteItem
}) => {
    return (
        <Dialog open={isDialogOpen} onClose={closeDialog} maxWidth="xs" fullWidth>
            <DialogActions>
                <div className={styles.closeButton}>
                    <Tooltip title="編集" placement="bottom">
                        <IconButton onClick={editItem} size="small">
                            <Edit />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="削除" placement="bottom">
                        <IconButton onClick={deleteItem} size="small">
                            <DeleteOutlineOutlined />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="閉じる" placement="bottom">
                        <IconButton onClick={closeDialog} size="small">
                            <Close />
                        </IconButton>
                    </Tooltip>
                </div>
            </DialogActions>

            <DialogContent>
                {item && (
                    <>
                    <div>
                        <Grid container
                              spacing={1}
                              alignItems="center"
                              justify="space-between"
                              style={spacer(0, 30)} >
                            <Grid item>
                                <span className={styles.box}></span>
                            </Grid>
                            <Grid item xs={10}>
                                <h2 className={styles.item}>
                                    {item.title}
                                </h2>
                                <p className={styles.date}>
                                    {item.date.format("M月 D日")}
                                </p>
                            </Grid>
                        </Grid>
                    </div>

                    {item.location && (
                        <Grid container
                              spacing={1}
                              alignItems="center"
                              justify="space-between"
                              style={spacer(0, 4)} >
                            <Grid item>
                                <LocationOnOutlined />
                            </Grid>
                            <Grid item xs={10}>
                                <p className={styles.item}>{item.location}</p>
                            </Grid>
                        </Grid>
                    )}
                    {item.description && (
                        <Grid container
                              spacing={1}
                              alignItems="center"
                              justify="space-between"
                              style={spacer(0, 4)} >
                            <Grid item>
                                <NotesOutlined />
                            </Grid>
                            <Grid item xs={10}>
                                <p className={styles.item}>{item.description}</p>
                            </Grid>
                        </Grid>
                    )}
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CurrentScheduleDialog;