import React, { Component, useHistory } from 'react';
//images
import cardbo_logo from '../assets/images/cardbo-logo.png'
import ReactLoading from 'react-loading';

// material ui
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SettingsIcon from '@material-ui/icons/Settings';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import PeopleIcon from '@material-ui/icons/People';
import Card from '@material-ui/core/Card';

import { Route } from "react-router-dom";
import Switch from 'react-router-transition-switch';
import Fader from 'react-fader';
import Clock from 'react-clock';
import { withAlert } from "react-alert";
import axios from 'axios';

//componets
import IOSSwitch from '../components/IOSSwitch'


const useStyles = () => ({
    root: {
        overflow: "hidden",
        maxHeight: "100vh",
        maxWidth: "100vw",
    },
    navigation: {
        width: "100vw",
        position: "absolute",
        bottom: 0,

    },
    pageContent: {
        width: "100vw",
        height: "100vh",
        backgroundColor: "#097ac5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    appCard: {
        width: "90vw",
        height: "80vh",
        marginBottom: "56px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
    },
    monitor: {
        width: "80vw",
        border: "solid 5px ",
        borderRadius: "5vw",
    },
    modeSelect: {
        color: "#097ac5",
        '&$checked': {
            color: "#097ac5",
        },
    },
    openDoorButton: {
        width: "40vw",
        height: "40vw",
        backgroundColor: "#097ac5",
        '&:hover': {
            backgroundColor: '#097ac5',
        },
        '&:active': {
            backgroundColor: '#097ac5',
        },
        color: "#fff"
    },
    openDoorButtonIcon: {
        width: "30vw",
        height: "30vw",
    },
    loading: {
        width: "100vw",
        height: "100vh",
        backgroundColor: "#097ac5",
        position: "absolute",
    },
    loadingImageHolder: {
        width: "45vw",
        height: "45vw",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 100
    },
    loadingImage: {
        width: "100%",
        height: "100%",
        zIndex: 101
    },
    loadingBubbles: {
        width: "50vw",
        height: "50vw",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
});

class Router extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            page: 0,
            time: new Date(),
            liveTvStatus: false,
            mode: "off",
        };
    }

    componentWillMount = () => {
    }

    handleChangeMode = (e) => {
        // 設定模式 ("off" or "unlock" or "lock")
        this.setState({ mode: e.target.value });
        let data = {'mode': this.state.mode}
        fetch('/change_mode', {
            body: JSON.stringify(data),
            headers:{
                'content-type': 'application/json'
            },
            method: 'POST'
        })
        .then(res => res.json())
    }

    handleChangeMonitor = () => {
        // 開啟/關閉監控
        this.setState({ liveTvStatus: !this.state.liveTvStatus })
    }

    handleClickOpenDoor = () => {
        // 遠端開門
        fetch('/open_door')
        .then(res=>res.json())
    }
    render() {
        const { classes } = this.props;
        if (this.state.loading) {
            return (
                <div className={classes.loading}>
                    <div className={classes.loadingBubbles}>
                        <ReactLoading type={'spin'} color={'#fff'} height={'50vh'} width={'50vw'} />
                    </div>
                    <div className={classes.loadingImageHolder}>
                        <img className={classes.loadingImage} src={cardbo_logo} alt="" />
                    </div>
                </div>)
        }
        else {
            const getPageContent = (page = this.state.page) => {
                switch (page) {
                    case 0:
                        return (<div>
                            <Card className={classes.appCard}>
                                <FormControl component="fieldset" >
                                    <FormLabel component="legend">設定模式</FormLabel>
                                    <RadioGroup aria-label="gender" name="gender1" value={this.state.mode} onChange={this.handleChangeMode}>
                                        <FormControlLabel value="off" control={<Radio className={classes.modeSelect} color="default" />} label="斷電模式" />
                                        <FormControlLabel value="unlock" control={<Radio className={classes.modeSelect} color="default" />} label="無門禁模式" />
                                        <FormControlLabel value="lock" control={<Radio className={classes.modeSelect} color="default" />} label="門禁模式" />
                                    </RadioGroup>
                                </FormControl>
                                <IconButton aria-label="open door" className={classes.openDoorButton} onClick={this.handleClickOpenDoor}>
                                    <MeetingRoomIcon className={classes.openDoorButtonIcon} />
                                </IconButton>
                            </Card>
                        </div>)
                    case 1:
                        return (<Card className={classes.appCard}>
                            <img src={this.state.liveTvStatus ? "/get_img" : "https://converus.com/english/wp-content/uploads/2016/10/Blue-Eye-Picture-RGB-new-crosshairs-400px-cropped-low-res-300x205.jpg"} className={classes.monitor} />
                            <IOSSwitch
                                label="開啟監控功能"
                                checked={this.state.liveTvStatus}
                                handleChange={this.handleChangeMonitor}
                            />
                        </Card>)
                    case 2:
                        return (<div>
                            管制
                        </div>)
                }
            };
            return (
                <div>
                    <div className={classes.pageContent}>
                        {/* <Fader> */}
                        {getPageContent()}
                        {/* </Fader> */}
                    </div>
                    <BottomNavigation
                        className={classes.navigation}
                        value={this.state.page}
                        onChange={(event, newValue) => {
                            this.setState({ page: newValue });
                        }}
                        showLabels
                    >
                        <BottomNavigationAction label="設定" icon={<SettingsIcon />} />
                        <BottomNavigationAction label="即時監控" icon={<LiveTvIcon />} />
                        <BottomNavigationAction label="門禁管理" icon={<PeopleIcon />} />
                    </BottomNavigation>
                </div>
            );
        }
    }
}
export default withAlert()(withStyles(useStyles)(Router));