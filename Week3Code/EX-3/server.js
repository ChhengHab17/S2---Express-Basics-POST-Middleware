// server.js
import express from 'express';
import courses from "./course.js";
import {logger} from './middleware/logger.js';
import { validateQuery } from './middleware/validateQuery.js';
import {auth} from './middleware/auth.js';

const app = express();
const PORT = 3000;

app.use(logger);
// app.use(auth); // Uncomment this line to enable authentication middleware

// Route: GET /departments/:dept/courses
app.get('/departments/:dept/courses', validateQuery, (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;
    // Implementing the filter logic
    // Hint: Use the filter method to filter the courses array based on the provided criteria

    const filteredData = courses.filter((course) => {
        const instructorMatch = !instructor || 
            course.instructor.toLowerCase().includes(instructor.toLowerCase());

        return course.department === dept &&
            (!level || course.level === level) &&
            (!minCredits || course.credits >= parseInt(minCredits)) &&
            (!maxCredits || course.credits <= parseInt(maxCredits)) &&
            (!semester || course.semester.toLowerCase() === semester.toLocaleLowerCase()) &&
            (instructorMatch);

    })
    if(filteredData.length === 0){
        return res.status(404).json({ error: "No courses found"});
    }
    res.json(filteredData);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
