import sklearn 
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

jd = "Seeking a candidate with 5-10 years of software development experience, adept at building, scaling, and maintaining distributed systems with open-source tools. The ideal candidate will excel in infrastructure development focused on user needs, possess expertise in AWS/Azure/OCI/GCP, and be proficient in Kubernetes. They should demonstrate the ability to optimize complex systems, make data-driven decisions, and empower developers through effective tooling, with proficiency in Go and Ruby."
# jd = "We're seeking a candidate with a Bachelors degree in Computer Science, Information Technology, or a related field, coupled with 3-5 years of hands-on experience in setting up and managing ELK (Elasticsearch, Logstash, and Kibana) stacks. The ideal candidate should demonstrate proven expertise as an ELK Engineer or in a similar role, possessing comprehensive knowledge of Elasticsearch, Logstash, and Kibana. Proficiency in Linux/Unix system administration and scripting languages like Python and shell is essential. Additional advantages include familiarity with infrastructure as code tools such as Terraform or Ansible, Docker, Kubernetes, and cloud platforms like AWS, Azure, or GCP. Strong analytical and problem-solving skills are a must, alongside effective communication and collaboration abilities. The ability to work autonomously and prioritize tasks in a dynamic environment is crucial. Certification as an Elastic Certified Engineer (ECE) or similar credentials would be advantageous."
# jd = "Having knowledge of applicable tools like Staad, SACS, Tekla, S3D, E3D, Revit in industry like Oil & Gas, Offshore, Power plant, Mining, process plant etc"
rd = "With 5-10 years of professional hands-on software development experience, I have honed my skills in developing, maintaining, and debugging distributed systems utilizing open-source tools. I specialize in building infrastructure as a product, meticulously tailored to users' needs, and possess a knack for scaling distributed systems in dynamic environments like AWS, Azure, OCI, or GCP. My proficiency in Kubernetes allows me to navigate complex systems adeptly, identifying areas for improvement and making data-driven cost-performance tradeoffs to influence design decisions. Additionally, I excel in breaking down intricate systems, optimizing performance, and crafting infrastructure and tools that empower developers, leveraging languages like Go and Ruby to achieve these goals seamlessly."

text = [rd, jd]

cv = CountVectorizer()
count_matrix= cv.fit_transform(text)

# print('\n Similarity score:', cosine_similarity(count_matrix))
matchPercentage = cosine_similarity(count_matrix)[0][1]*100
matchPercentage = round(matchPercentage, 2)
print(matchPercentage)
