import React, { useState, useEffect } from "react";
import { Button, Grid, Typography, Box, Link } from "@material-ui/core";
import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@material-ui/core/Tooltip';
// import { useStyles } from "./UsersStyle";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import makeStyles from "@material-ui/core/styles/makeStyles";
import constants from "../utils/constants";

const customerData = [
    { uuid: 1,  title: null,   content: null,      email: "user@gmail.com" },
    { uuid: 2,  title: "Male 2",   content: "Customer 2",      email: "user@gmail.com" },
    { uuid: 3,  title: "Female 3", content: "Customer 3",      email: "user@gmail.com" }, 
    { uuid: 4,  title: "Male 4",   content: "Customer 4",      email: "user@gmail.com" },
    { uuid: 5,  title: "Male 5",   content: "Customer 5",      email: "user@gmail.com" },
    { uuid: 6,  title: "Female 6", content: "Customer 6",      email: "user@gmail.com" },
    { uuid: 7,  title: "Male 7",   content: "Customer 7",      email: "user@gmail.com" },
    { uuid: 8,  title: "Male 8",   content: "Customer 8",      email: "user@gmail.com" },
    { uuid: 9,  title: "Female 9", content: "Customer 9",      email: "user@gmail.com" },


];



const useStyles = makeStyles((theme) => ({
    customerList: {
        height: 350,
        width: 950,
        textAlign: "center"
    }
}));



const MyContentDataTable = (props) => {
    const classes = useStyles();
    const [customers, setCustomers] = React.useState(customerData);
    const [pageSize, setPageSize] = React.useState(5);

    const [page, setPage] = React.useState(0);
    const [editOpen, setEditOpen] = React.useState(false);
    const [publishClicked, setPublishClicked] = React.useState(false);
    const [content, setContent] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [email, setEmail] = React.useState("");
    let initialFormData = { uuid: null, title: "", content: "", email: "" };
    const [currentCustomer, setCurrentCustomer] = React.useState(initialFormData);

    // initial data I am passing to customer state
    const columns = [
        { field: "uuid", headerName: "UUID", width: 70 },
        { field: "content", headerName: "Content", width: 200 },
        {
            field: "title",
            headerName: "Title",
            width: 150,
            renderCell: (cellValues) => {                
                return <Link 
                // href={`/${constants.U}/${localStorage.getItem(constants.HALLA_AUTH_USER)}/${constants.CONTENT}/${cellValues.row.uuid}`}
                    href={`/article/edit/${cellValues.row.uuid}`}
                > {cellValues.row.title}  </Link>;
            }
        },
        {
            field: "email",
            headerName: "Email",
            description: "This column has a value getter and is not sortable.",
            width: 250
        },
        {
            field: "edit",
            headerName: "Edit",
            width: 150,

            // Important: passing customers state so I can edit each user
            renderCell: (customers) => (
                <>
                    <Button
                        style={{
                            backgroundColor: "#00B6E0",
                            marginRight: 40,
                            padding: "3px 35px"
                        }}
                        variant="contained"
                        color="primary"
                        type="submit"
                        
                        // href={`/${constants.U}/${localStorage.getItem(constants.HALLA_AUTH_USER)}/${constants.MYCONTENT}/${customers.row.uuid}/${constants.EDIT}`}
                        href={`/article/edit/${customers.row.uuid}`}
                    >
                        Edit
                    </Button>
          
                   
                
                
           
                </>
            )
        },
        {
            field: "publish",
            headerName: "Publish",
            width: 150,
            renderCell: (customers) => 
                
                 (customers.row.title && customers.row.content ?
                 
                 <>
                
                    
                    <Button
                        style={{
                            backgroundColor: "#D32923",
                            marginRight: 40,
                            padding: "3px 35px"
                        }}
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={() => handlePublishClick(customers)}
                    >
                        Publish
                    </Button>
                    <Dialog open={publishClicked} onClose={handlePublishClickClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">{customers.row.title}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {customers.row.content}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handlePublishClickClose} color="primary">
                                Cancel
                            </Button>
                            <Button
                                style={{
                                    backgroundColor: "#D32923"}}
                                onClick={handlePublishClickClose} variant="contained"
                                color="primary"
                                type="submit">
                                Publish
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {/* <Dialog
                        disableBackdropClick
                        open={publishClicked}
                        onClose={handlePublishClickClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">Edit Customer</DialogTitle>
                        <form
                            noValidate
                        // onSubmit={() => handleSubmit(id)}
                        >
                            <DialogContent>
                                <TextField
                                    value={currentCustomer.name}
                                    onChange={(event) => setName(event.target.value)}
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Name"
                                    type="text"
                                    fullWidth
                                />
                                <TextField
                                    value={currentCustomer.gender}
                                    onChange={(event) => setGender(event.target.value)}
                                    margin="dense"
                                    id="gender"
                                    label="Gender"
                                    type="text"
                                    fullWidth
                                />
                                <TextField
                                    value={currentCustomer.email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    margin="dense"
                                    id="email"
                                    label="Email Address"
                                    type="email"
                                    fullWidth
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleEditClose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleEditClose} color="primary" type="submit">
                                    Add
                                </Button>
                            </DialogActions>
                        </form>
                    </Dialog> */}
                     
                
                </> : <>
                    <Tooltip title="Title and Content required for publication">
                        <span>
                    <Button
                        style={{
                            backgroundColor: "#D32923",
                            // marginRight: 40,
                            // padding: "3px 35px"
                        }}
                        variant="contained"
                        color="primary"
                        disabled
                        type="submit"
                        onClick={() => handlePublishClick(customers)}
                    >
                        Publish
                    </Button>
                    </span>

                    </Tooltip>
                </>)
                
                    
        }

    ];

    const handleSubmit = (clickedUser) => {
        //some update will go
    };

    const handleEditOpen = (clickedUser) => {
        console.log(clickedUser.row);
        console.log(editOpen)
        console.log(editOpen)
        setCurrentCustomer({
            uuid: 5,
            title: clickedUser.row.title,
            content: clickedUser.row.content,
            email: clickedUser.row.email
        });
        console.log("title  + content: " ,  clickedUser.row.title , clickedUser.row.content)
        
        console.log(currentCustomer);
        
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    const handlePublishClick = (clickedUser) => {
        console.log(clickedUser);
        setPublishClicked(true);
        setCurrentCustomer({
            uuid: clickedUser.uuid,
            name: clickedUser.name,
            gender: clickedUser.gender,
            email: clickedUser.email
        });
        console.log(currentCustomer);
    };

    const handlePublishClickClose = () => {
        setPublishClicked(false);
    };

    return (
        <div style={{ height: 400, width: '100%' }}>
            {console.log("in the contentdatatable child comp")}
            {console.log(props)}
        <div style={{ display: 'flex', height: '100%' }}>
         <div style={{ flexGrow: 1 }}>
            <div className={classes.customerList}>

                <DataGrid
                    autoHeight
                            getRowId={(r) => r.uuid}
                    rows={customers}
                    columns={columns}
                    
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            rowsPerPageOptions={[5, 10, 20]}
                            pagination
                            autoPageSize
                    checkboxSelection={false}
                    disableSelectionOnClick={true}
                />
            </div>
        </div>
        </div>
         </div>

        //         <div style={{ height: 400, width: '100%' }}>
        //   <div style={{ display: 'flex', height: '100%' }}>
        //     <div style={{ flexGrow: 1 }}>
        //             <DataGrid
        //             rows={customers}
        //             columns={columns}
        //             pageSize={5}
        //             checkboxSelection={false}
        //             disableSelectionOnClick={true}
        //         />
        //     </div>
        //   </div>
        // </div>

    //         <div style={{ height: 400, width: '100%' }}>
    //   <div style={{ display: 'flex', height: '100%' }}>
    //     <div style={{ flexGrow: 1 }}>
    //       <DataGrid {...data} />
    //     </div>
    //   </div>
    // </div>
    );
};
export default MyContentDataTable;
