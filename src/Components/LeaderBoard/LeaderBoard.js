import React from 'react';
import './LeaderBoard.css';

class LeaderBoard extends React.Component{
    constructor(){
        super();
        this.state = {
            first: {
                name: '',
                entries: ''
            },
            second: {
                name: '',
                entries: ''
            },
            third: {
                name: '',
                entries: ''
            },
            fourth: {
                name: '',
                entries: ''
            },
            fifth: {
                name: '',
                entries: ''
            }
        }
    }

    getRankings(){
        fetch('https://rocky-refuge-82156.herokuapp.com/leaderboard', {
            method: 'get',
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(data=> {
            this.setState(Object.assign(this.state.first, {name: data[0].name, entries: data[0].entries}))
            this.setState(Object.assign(this.state.second, {name: data[1].name, entries: data[1].entries}))
            this.setState(Object.assign(this.state.third, {name: data[2].name, entries: data[2].entries}))
            this.setState(Object.assign(this.state.fourth, {name: data[3].name, entries: data[3].entries}))
            this.setState(Object.assign(this.state.fifth, {name: data[4].name, entries: data[4].entries}))
        })
        console.log(this.state);
    }

    componentDidMount(){
        this.getRankings();
    }
    render(){
        return (
            <article id='articleLeader' className="br3 ba dark-gray b--black-10 mv4 w-100 w-200-m w-100-l mw8 shadow-5 center">
            <legend id='titleLeader' className="f1 fw6 ph0 mh0 center">Most Faces Scanned</legend>
            <div className="pa4">
                <div className="overflow-auto">
                    <table className="f1 w-100 mw8 center mt5" cellSpacing="0">
                    <tbody className="lh-copy">
                        <tr>
                        <td className="pv3 pr3 bb b--black-20">{this.state.first.name}</td>
                        <td className="pv3 pr3 bb b--black-20">{this.state.first.entries}</td>
                        </tr>
                        <tr>
                        <td className="pv3 pr3 bb b--black-20">{this.state.second.name}</td>
                        <td className="pv3 pr3 bb b--black-20">{this.state.second.entries}</td>
                        </tr>
                        <tr>
                        <td className="pv3 pr3 bb b--black-20">{this.state.third.name}</td>
                        <td className="pv3 pr3 bb b--black-20">{this.state.third.entries}</td>
                        </tr>
                        <tr>
                        <td className="pv3 pr3 bb b--black-20">{this.state.fourth.name}</td>
                        <td className="pv3 pr3 bb b--black-20">{this.state.fourth.entries}</td>
                        </tr>
                        <tr>
                        <td className="pv3 pr3 bb b--black-20">{this.state.fifth.name}</td>
                        <td className="pv3 pr3 bb b--black-20">{this.state.fifth.entries}</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                </div>
                </article>
    
        )
    }
}

export default LeaderBoard;