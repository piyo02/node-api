'use strict';
// ketat, jadi ketika ada typo ketahuan

exports.ok = (values, res) => {
    const data = {
        'status': 200,
        'values': values
    };

    res.json(data);
    res.end();
}

exports.nestedJoin = (values, res) => {
    // accomulatuon
    const result = values.reduce( (accomulation, item) => {
        // choose key gruop
        if(accomulation[item.nama]){
            // make new variable group student's namee
            const group = accomulation[item.nama];
            // check if content of array is course name
            if(Array.isArray(group.course_name)){
                // add value into group course name
                group.course_name.push(item.course_name);
            } else {
                group.course_name = [group.course_name, item.course_name];
            }
        } else {
            accomulation[item.nama] = item;
        }

        return accomulation;
    }, {})
    
    const data = {
        'status': 200,
        'values': result
    };

    res.json(data);
    res.end();
}