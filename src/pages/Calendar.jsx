import React, {useEffect, useState, Component} from 'react'
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react"
import '../styles/CalendarStyles.css'
import facade from '../apiFacade.js'
import * as PropTypes from "prop-types";

const styles = {
    wrap: {
        display: "flex"
    },
    left: {
        marginRight: "10px"
    },
    main: {
        flexGrow: "1"
    }
};

DayPilot.Locale.register("da-dk");

//TODO, hvordan skal jeg placere denne for at den virker??


class Calendar extends Component {
    constructor(props) {
        super(props);
        this.calendarRef = React.createRef();
        this.state = {
            viewType: "Week",
            durationBarVisible: false,
            timeRangeSelectedHandling: "Enabled",
            onTimeRangeSelected: async args => {
                const dp = this.calendar;
                const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
                dp.clearSelection();
                if (!modal.result) {
                    return;
                }
                dp.events.add({
                    start: args.start,
                    end: args.end,
                    id: DayPilot.guid(),
                    text: modal.result
                });
            },
            eventDeleteHandling: "Update",
            onEventClick: async args => {
                const dp = this.calendar;
                const modal = await DayPilot.Modal.prompt("Update event text:", args.e.text());
                if (!modal.result) {
                    return;
                }
                const e = args.e;
                e.data.text = modal.result;
                dp.events.update(e);
            },
        };
    }

    get calendar() {
        return this.calendarRef.current.control;
    }

    componentDidMount() {
        // const events = [
        //     {
        //         id: "1",
        //         text: "Vestermarie (skolen) GYMNASTIKSALEN",
        //         start: "2022-11-10T09:30:00",
        //         end: "2022-11-10T13:00:00"
        //     },
        //     {
        //         id: "2",
        //         text: "RÃ¸nne SvÃ¸mmehal, 25 meter- og springbassin",
        //         start: "2022-11-11T09:00:00",
        //         end: "2022-11-11T11:00:00"
        //     },
        //     {
        //         id: "3",
        //         text: "RÃ¸nne SvÃ¸mmehal, bÃ¸rnebassin",
        //         start: "2022-11-11T09:00:00",
        //         end: "2022-11-11T11:00:00"
        //     },
        //     {
        //         id: "4",
        //         text: "Vestermarie (skolen) GYMNASTIKSALEN",
        //         start: "2022-11-17T09:30:00",
        //         end: "2022-11-17T13:00:00"
        //     }
        //
        //  ];
// const data =
//     [
//         {
//             id: 1,
//             text: "Vestermarie (skolen) GYMNASTIKSALEN",
//             start: "2022-11-10T09:30:00",
//             end: "2022-11-10T13:00:00"
//         },
//         {
//             id: 2,
//             text: "RÃ¸nne SvÃ¸mmehal, 25 meter- og springbassin",
//             start: "2022-11-11T09:00:00",
//             end: "2022-11-11T11:00:00"
//         },
//         {
//             id: 3,
//             text: "RÃ¸nne SvÃ¸mmehal, bÃ¸rnebassin",
//             start: "2022-11-11T09:00:00",
//             end: "2022-11-11T11:00:00"
//         },
//         {
//             id: 4,
//             text: "Vestermarie (skolen) GYMNASTIKSALEN",
//             start: "2022-11-17T09:30:00",
//             end: "2022-11-17T13:00:00"
//         }
//     ]
//
//         //{data.map(event => ({event.id}))}
//


        const events = this.props.resourceInfo


//         const events =
//             [
//                 data.map (data=> (
//                     {
//                         id: data.id,
//                         text: data.text,
//                         start: data.start,
//                         end: data.end
//                     }
//                 ))
//             ];
        console.log(events)

        // [
        //     {
        //         "id": "1",
        //         "text": "Vestermarie (skolen) GYMNASTIKSALEN",
        //         "start": "2022-11-10T09:30",
        //         "end": "2022-11-10T13:00"
        //     },
        //     {
        //         "id": "2",
        //         "text": "RÃ¸nne SvÃ¸mmehal, 25 meter- og springbassin",
        //         "start": "2022-11-11T09:00",
        //         "end": "2022-11-11T11:00"
        //     },
        //     {
        //         "id": "3",
        //         "text": "RÃ¸nne SvÃ¸mmehal, bÃ¸rnebassin",
        //         "start": "2022-11-11T09:00",
        //         "end": "2022-11-11T11:00"
        //     },
        //     {
        //         "id": "4",
        //         "text": "Vestermarie (skolen) GYMNASTIKSALEN",
        //         "start": "2022-11-17T09:30",
        //         "end": "2022-11-17T13:00"
        //     }
        // ]


        this.calendar.update({events});

    }

    render() {
        return (
            <div>
                <br/>
                <h1>Kalender</h1>
                <br/>
                <div style={styles.wrap}>
                    <div style={styles.left}>

{/*//TODO sende de valgte datoer til backend , så infor bliver hentet for den tidsperiode*/}
                        <DayPilotNavigator
                            selectMode={"week"}
                            onTimeRangeSelected={args => {
                                this.calendar.update({
                                    startDate: args.day
                                });
                            }}
                        />
                    </div>
                    <div style={styles.main}>
                        <DayPilotCalendar
                            {...this.state}
                            ref={this.calendarRef}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

// TODO: lækkert hvis der kan stå ugedage i toppen og tiderne kan være DK format

// const Calendar = () => {
//
// const [id, setId] = useState("")
// const [data, setData] = useState({})
//
//
//
//
//
// function findPokemon() {
//
//
//     let input = document.getElementById("inputId").value
//
//     let button = document.getElementById("disable")
//
//
//
//
//   if (!button.disabled)
//   {
//
//     button.disabled = true;
//     facade.findPokemon(input)
//         .then((res) => {
//             setData(res)
//             setTimeout(() => {
//                 button.disabled = false;
//             }, 3000)
//
//
//
//         })
//
//
//
//
// }
//
// }
//
//
//
//
//
//   return (
//     <div className="Pokesite">
//             <div className="pokeLeft">
//                 <div className="pokeLeftContent">
//                     <p className="search">
//                         find pokemon
//                     </p>
//                     <p className="searchDesc">Find en pokemon med vores smarte Pokemon API</p>
//                     <input id='inputId' type="text" placeholder="1 || pikachu"/>
//                     <button id="disable" onClick={findPokemon} className='pokeButton'>
//                         <div className="innerPoke">
//                             <div className="midPoke"></div>
//                             <div className="midCircle">
//                                 <div className="midInnerCircle">
//
//                                 </div>
//                             </div>
//                             <div className="innerBottom"></div>
//
//
//
//                         </div>
//                     </button>
//                 </div>
//
//             </div>
//             <div className="pokeRight">
//                 <div className="pokedex">
//                     <div className="pokedexTop">
//                         <div className="pokedexTopLeft">
//                             <div className="bigCircle"></div>
//                             <div className="circleArray">
//                                 <div id="first" className="smallCircle"></div>
//                                 <div id="second" className="smallCircle"></div>
//                                 <div id="third" className="smallCircle"></div>
//                             </div>
//                         </div>
//                         <div className="pokedexTopRight"></div>
//                         <div className="line"></div>
//                     </div>
//
//                     <div className="pokemonWindow">
//
//
//
//                         <div className="windowTop" id="pokemonWindow">
//
//                             <img src={data?.pokemonImage} alt="" className="src" />
//                             <p>Id#{data?.pokemonId}</p>
//
//                         </div>
//                         <p>{data?.pokemonName}</p>
//                         <p className="random">{data?.randomFact}</p>
//
//                     </div>
//                     <div className="bottomDisplay">
//                         <div className="displayLeft"></div>
//                         <div className="displayMid">
//                             <div className="midTopButtons">
//                                 <div className="midTopButton"></div>
//                                 <div id="blue" className="midTopButton"></div>
//                             </div>
//                             <div className="midBottomButton"></div>
//                         </div>
//                         <div className="displayRight">
//                             <div className="xButtonLayer1"></div>
//                             <div className="xButtonLayer2"></div>
//
//                         </div>
//                     </div>
//
//                 </div>
//
//             </div>
//
//     </div>
//   )
// }

export default Calendar
