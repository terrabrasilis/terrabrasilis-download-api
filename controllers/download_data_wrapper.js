var pool = require('../models/postgres');

exports.defineDownloadCall = function(req, res, next) {
    
    const id_period = req.query.id_period;
    
    if (!id_period) { 
        // response based on status - 401 Not Allowed
        res.status(400).send('{code: 400, message: "Bad Request"}');
        return;
    }

    const id_class = req.query.id_class;

    if (!id_class) { 
        // response based on status - 401 Not Allowed
        res.status(400).send('{code: 400, message: "Bad Request"}');
        return;
    }

    const id_data = req.query.id_data;
    
    if (!id_data) { 
        // response based on status - 401 Not Allowed
        res.status(400).send('{code: 400, message: "Bad Request"}');
        return;
    }

    const id_loiname = req.query.id_loiname;

    if (!id_loiname) { 
        // response based on status - 401 Not Allowed
        res.status(400).send('{code: 400, message: "Bad Request"}');
        return;
    }

    var query = "SELECT \'FeatureCollection\' As type, array_to_json(array_agg(f)) As features \
    FROM (	SELECT \'Feature\' As type, \
       left(fe.gid_polygon, strpos(fe.gid_polygon, \'_\')-1) As id, \
       ST_AsGeoJSON(ST_UNION(fe.geom))::json As geometry, \
       json_build_object (\'period\', fe.id_period, \'loiname\', fe.id_data_loi_loinames, \'class\', fe.id_data_class) As properties \
       FROM features fe \
       INNER JOIN data_loi_loinames dll ON (fe.id_data_loi_loinames = dll.id) \
       INNER JOIN data_class dc ON (fe.id_data_class = dc.id) \
       INNER JOIN period p ON (fe.id_period = p.id AND p.id IN ("+id_period+")) \
       INNER JOIN class c ON (dc.id_class = c.id AND c.id IN ("+id_class+")) \
       INNER JOIN data d ON (dc.id_data = d.id AND d.id IN ("+id_data+")) \
       INNER JOIN loi_loinames ll ON (dll.id_loi_loinames = ll.id) \
       INNER JOIN loinames l ON (ll.gid_loinames = l.gid AND l.gid IN ("+id_loiname+")) \
       GROUP BY fe.id_period, fe.id_data_loi_loinames, fe.id_data_class, left(fe.gid_polygon, strpos(fe.gid_polygon, \'_\')-1)) As f;"
  
    pool.query(query, [], (error, results) => {
        
        if (error) {
            res.status(400).send('{code: 400, message: "Bad Request"}');
        }

        res.status(200).json(results.rows[0]);
        
    });

}