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