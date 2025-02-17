'use strict';

var _             = require('lodash');
var React         = require('react');
var PT            = React.PropTypes;
var FluxComponent = require('../flux/flux-component');
var Quadrant      = require('./quadrant');

class Grid extends React.Component
{
    constructor(props, context)
    {
        super(props, context);

        this.addTask         = this.addTask.bind(this);
        this.removeTask      = this.removeTask.bind(this);
        this.toggleCompleted = this.toggleCompleted.bind(this);
    }

    addTask(quadrant, task)
    {
        this.props.flux.actions.addTask(this.props.id, quadrant, task);
    }

    removeTask(quadrant, taskId)
    {
        this.props.flux.actions.removeTask(this.props.id, quadrant, taskId);
    }

    toggleCompleted(quadrant, taskId)
    {
        this.props.flux.actions.toggleCompleted(this.props.id, quadrant, taskId);
    }

    render()
    {
        return (
            <div className='grid'>
                <Quadrant
                    className       = 'grid__quadrant--do'
                    hint            = 'Always focus on clearing this list out.'
                    tasks           = {this.props.tasks.do}
                    addTask         = {_.partial(this.addTask, 'do')}
                    removeTask      = {_.partial(this.removeTask, 'do')}
                    toggleCompleted = {_.partial(this.toggleCompleted, 'do')}
                />
                <Quadrant
                    className       = 'grid__quadrant--plan'
                    hint            = 'This should be on the head. It cannot be left unnoticed.'
                    tasks           = {this.props.tasks.plan}
                    addTask         = {_.partial(this.addTask, 'plan')}
                    removeTask      = {_.partial(this.removeTask, 'plan')}
                    toggleCompleted = {_.partial(this.toggleCompleted, 'plan')}
                />
                <Quadrant
                    className       = 'grid__quadrant--delegate'
                    hint            = 'Adds value to life. List cannot be untouched for a long time.'
                    tasks           = {this.props.tasks.delegate}
                    addTask         = {_.partial(this.addTask, 'delegate')}
                    removeTask      = {_.partial(this.removeTask, 'delegate')}
                    toggleCompleted = {_.partial(this.toggleCompleted, 'delegate')}
                />
                <Quadrant
                    className       = 'grid__quadrant--later'
                    hint            = 'When I am doing nothing, I should do this.'
                    tasks           = {this.props.tasks.delay}
                    addTask         = {_.partial(this.addTask, 'delay')}
                    removeTask      = {_.partial(this.removeTask, 'delay')}
                    toggleCompleted = {_.partial(this.toggleCompleted, 'delay')}
                />
            </div>
        );
    }
}

Grid.propTypes = {
    tasks : PT.shape({
        do       : PT.arrayOf(PT.object).isRequired,
        plan     : PT.arrayOf(PT.object).isRequired,
        delegate : PT.arrayOf(PT.object).isRequired,
        delay    : PT.arrayOf(PT.object).isRequired
    }).isRequired,
    id : PT.number
};

export default FluxComponent(Grid, ['grid']);
