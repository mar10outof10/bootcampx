const { Pool } = require('pg');
// arg should be cohort name in format "MTH##" eg JUL02
const cohort = process.argv.slice(2, 3);

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'  
});

pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = $1
ORDER BY teacher;
`, cohort)
.then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort}:  ${row.teacher}`);
  })
})
.catch(err => console.error('query error', err.stack));