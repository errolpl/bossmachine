const checkMillionDollarIdea = (numWeeks, weeklyRevenue) => {
    if(numWeeks * weeklyRevenue > 1000000) {
        console.log('good job')
    } else {
        console.log("you're a dissapointment🤦🏾‍♂️")
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
