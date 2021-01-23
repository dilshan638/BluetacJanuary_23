
const initialState = { stepOne :{},spec:[] };


function reducer(state, action) {
    switch (action.type) {
        case "stepOneSubmitted":
            return { stepOne : action.submittedData,
                spec : state.spec
            };
        case "stepTwoSubmitted":
            return { stepOne : state.stepOne,
                spec: state.spec
            };
        case "specSubmitted":
            return { stepOne: state.stepOne,
                spec: state.spec.concat(action.submittedData)
            };
        case "recordRemoved":
            let newSpec = state.spec.filter((e,i)=> i !== action.id);
            return {stepOne:state.stepOne,
                spec:newSpec,
            }
        case 'reset':
            return { stepOne: {},spec:[] }
    }
}


export{
    initialState,
    reducer
}