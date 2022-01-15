import React, { Component } from 'react';

class Counter extends Component {
    state = {
        count : 0,
        tags : ['tag1', 'tag2', 'tag3'],
    }
    render() { 
        return (
            <div>
                {this.state.tags.length === 0 && <p>Please add a tag</p>}
                {this.getTags()}
                {/* <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
                <button className='btn btn-secondary btn-sm'>Increment</button> */}
            </div>
        );
    }
    
    getTags() {
        if(this.state.tags.length === 0 ) return <p>There was no tags</p>
        return <ul>{this.state.tags.map( tag => <li>{tag}</li>)}</ul>;
    }

    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        classes += this.state.count === 0 ? "warning" : 'primary';
        return classes;
    }

    formatCount() {
        const { count } = this.state
        return count === 0 ? "Zero" : count;
    }
}
 
export default Counter;