function reducer(state={todos:[], filterName: 'ALL'},action) {

    switch(action.type){
        case 'ADD':
            state.todos.push({item:action.item,isComplete:false});
            return state;
        case 'DELETE':
            state.todos.splice(action.item, 1);
            return state;
        case 'CHANGESTATE':
            state.todos[action.item].isComplete =  !state.todos[action.item].isComplete;
            return state;
        case 'COMPLETE':
            console.log('dfghjk');
            const completed = state.todos.filter((todo) =>todo.isComplete);
            console.log(completed);
            return completed;
        case 'FILTER' :
            state.filterName = action.filterName;
            console.log(state.filterName);
            return state;
        default:
            return state;
    }
}

module.exports = reducer;
