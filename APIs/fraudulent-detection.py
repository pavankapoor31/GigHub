import requests
import json

url = "https://www.startupwala.com/api/company_search/"
company = 'FunkyMonkey'
experience = {"exp":4.0}
api_link = "http://172.208.57.14:2303/salary_prediction"
job_link = "http://172.208.57.14:3001/api/jobs/"
job_id= "663fe05845cd818de6cf8029"
res = requests.get(job_link+job_id)
data = res.json()
salary_offered = ((data.get('budget')*8)*24)
response = requests.get(url + company)

if response.status_code == 200:
    data = response.json()
    
    if data == 0:
        headers = {'Content-Type': 'application/json'}
        pred_salary = requests.post(api_link, data=json.dumps(experience), headers=headers)
        if salary_offered > int(pred_salary.text*2):
            print('This post is likely to be a scam because, the company is not registered and the salary is way beyond market standards')
    else:
        found_company = data[0]['company_name'].lower()
        provided_company = company.lower()
        print("Company unverified")
        
    if found_company == provided_company:
        print('Verified Company')
    else:
        print('Company not found or name does not match exactly.')
else:
    print("Error:", response.status_code)
