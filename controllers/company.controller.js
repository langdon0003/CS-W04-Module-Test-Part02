const fs = require("fs");
const companyController = {};

companyController.getAllCompanies = (req, res, next) => {
  const { city, page, sortBy, order } = req.query;

  const limit = 20;
  const reqPage = parseInt(page) || 1;

  try {
    let rawData = fs.readFileSync("data.json", "utf-8");
    let data = JSON.parse(rawData);
    let companyList = data.companies;
    let jobsList = data.jobs;
    let ratingsList = data.ratings;
    let result = companyList;

    if (city) {
      const filteredJobsList = [];

      city.split(",").forEach((eachCity) => {
        const temp = jobsList.filter((i) => i.city === eachCity);
        filteredJobsList.push(...temp);
      });
      // Get list of all job located on Miami
      // const filteredJobsList = jobsList.filter((i) => i.city === city);

      // Filter out all company ID
      const filteredCompanyID = filteredJobsList.map((i) => i.companyId);

      // Remove dup ID
      let removedDupID = [];

      filteredCompanyID.forEach((i) => {
        if (removedDupID.indexOf(i) < 0) {
          const filterCompany = companyList.filter((x) => x.id === i);

          // for check dup id
          removedDupID.push(i);

          // add company obj to result
          result.push(filterCompany[0]);
        }
      });

      console.log("result.length :>> ", result.length);
      console.log("removedDupID.length :>> ", removedDupID.length);
    }

    if (sortBy === "ratings") {
      const ratedCompanyList = companyList.map((x) => {
        console.log("111x.rating :>> ", x);
        x.ratings.map((x) => {
          oneRating = ratingsList.find((item) => item.id === x);

          const averageRating =
            (oneRating.workLifeBalanceRatings +
              oneRating.payAndBenefits +
              oneRating.jobsSecurityAndAdvancement +
              oneRating.management +
              oneRating.culture) /
            5;
          // console.log("oneRating :>> ", averageRating);
          return averageRating;
        });
        // console.log("x.rating :>> ", x.rating);
      });

      let queryCompany = companyList.find((i) => i.name === companyName);

      result = result.filter((i) => i.companyId === queryCompany.id);
    }

    // if (singleSkill) {
    //   result = result.filter((i) => i.skills.includes(singleSkill));
    // }

    result = result.slice((reqPage - 1) * limit, reqPage * limit);
    // console.log("result.length :>> ", result.length);
    // console.log("result[0].id :>> ", result[0].id);
    return res.status(200).send({ result });
  } catch (error) {
    next(error);
  }
};

companyController.createCompany = (req, res, next) => {
  console.log("createcompany");
  return res.status(200).send("createcompany");
};
companyController.deleteCompanyById = (req, res, next) => {
  console.log("deletecompanyById");
  return res.status(200).send("deletecompanyById");
};
companyController.updateCompanyById = (req, res, next) => {
  console.log("updatecompanyById");
};

module.exports = companyController;
