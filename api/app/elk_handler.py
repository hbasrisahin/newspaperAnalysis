import os
import configparser
from datetime import datetime
from elasticsearch import Elasticsearch
from elasticsearch_dsl import Search, Date, DateRange

#Solr baglantisi
config = configparser.ConfigParser()
config.read('settings.ini')

URL = config["ELK"]["es_server"]
UN = config["ELK"]["es_un"]
PW = config["ELK"]["es_pw"]


URLCLOUD = config["ELKCLOUD"]["es_server"]
UNCLOUD = config["ELKCLOUD"]["es_un"]
PWCLOUD = config["ELKCLOUD"]["es_pw"]

class ELK_Handler():
    """
    ELK handler
    """
    def __init__(self):
        self.client = Elasticsearch(['http://{}:{}@{}/'.format(UN, PW, URL)])
        self.clientCluster = Elasticsearch(['http://{}:{}@{}/'.format(UNCLOUD, PWCLOUD, URLCLOUD)])
        print('http://{}:{}@{}/'.format(UNCLOUD, PWCLOUD, URLCLOUD))
        print(self.client)
        print(self.clientCluster)


    def index(self, data, es_index):
        doc_id = ""
        if (es_index == "gazete-index"):
            doc_id = ".".join((data["date"], data["name"]))
        elif (es_index == "page-index"):
            doc_id = ".".join((data["date"], data["name"] + "_" + str(data["page"])))
        data["id"] = doc_id
        data["title"] = doc_id

        try:
            del data["_id"] # _id is not allowed
        except:
            pass

        date_ = [int(x) for x in data["date"].split('_')]
        data['timestamp'] = datetime(date_[0], date_[1], date_[2])

        res = self.client.index(index=es_index, id=doc_id, body=data)
        print(res['result'])

    def query(self, keyword, start_date, end_date,
    index="page-index",
    fields=['text', 'ner.PERSON', 'ner.LOCATION', 'ner.ORGANIZATION'],
    clientIsCluster=False):

        sdate_ = [int(x) for x in start_date.split('_')]
        edate_ = [int(x) for x in end_date.split('_')]
        if(clientIsCluster):
            self.usingClient = self.clientCluster;
        else:
            self.usingClient = self.client;

        s = Search(using=self.usingClient, index=index) \
            .filter("range", timestamp={'gte': datetime(sdate_[0], sdate_[1], sdate_[2]), 'lt': datetime(edate_[0], edate_[1], edate_[2])},) \
            .query("multi_match", query=keyword, fields=fields,analyzer="standard") \
            .extra(from_=0, size=1000)

        response = s.execute()

        res = []

        for hit in s:
            res.append(hit.to_dict())
            print(hit.title)

        return res #s.to_dict()



