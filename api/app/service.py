
# coding: utf-8

import json
import requests
from datetime import datetime

from flask import Flask, jsonify, request, render_template
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS

import logging


#from db_handler import DB_Handler
from elk_handler import ELK_Handler

keyword = "Nothing"
year = 0

app = Flask(__name__)
api = Api(app)
CORS(app)


# Define parser and request args
parser = reqparse.RequestParser()
parser.add_argument('keyword', type=str)
parser.add_argument('start_date', type=str)
parser.add_argument('end_date', type=str)
parser.add_argument('index', type=str)
parser.add_argument('isText', type=str)
parser.add_argument('isPerson', type=str)
parser.add_argument('isLocation', type=str)
parser.add_argument('isOrganization', type=str)
parser.add_argument('isCluster', type=str)

#db_page = DB_Handler("page")
es = ELK_Handler()

class GazeteQuery(Resource):
    def get(self):
        args = parser.parse_args()
        print("{'hello': 'world','keyword': "+ args['keyword'] +",\
                 'start_date': "+args['start_date']+",\
                 'end_date': "+args['end_date'] +",\
                 'index': "+args['index'] +",\
                 'isText': "+str(args['isText'])+",\
                 'isPerson': "+str(args['isPerson']) +",\
                 'isLocation': "+str(args['isLocation']) +",\
                 'isOrganization': "+str(args['isOrganization']) +",\
                 'isCluster': "+str(args['isCluster']) +"}")

        get_module_logger("service").info("{'hello': 'world',\
                 'keyword': "+ args['keyword'] +",\
                 'start_date': "+args['start_date']+",\
                 'end_date': "+args['end_date'] +",\
                 'index': "+args['index'] +",\
                 'isText': "+str(args['isText'])+",\
                 'isPerson': "+str(args['isPerson']) +",\
                 'isLocation': "+str(args['isLocation']) +",\
                 'isOrganization': "+str(args['isOrganization']) +",\
                 'isCluster': "+str(args['isCluster']) +"}")

        self.isCluster=False;
        fields=[];
        if args['isText']=="true":
            fields.append("text")
        if args['isPerson']=="true":
            fields.append("ner.PERSON")
        if args['isLocation']=="true":
            fields.append("ner.LOCATION")
        if args['isOrganization']=="true":
            fields.append("ner.ORGANIZATION")
        if args['isCluster']=="true":
            self.isCluster=True;

        


        res = es.query(args['keyword'], args['start_date'], args['end_date'],args['index'],fields=fields,clientIsCluster=self.isCluster)
        for i, _ in enumerate(res):
            res[i]['png'] = "http://localhost:5984/page/" + res[i]['id'] + "/png"

        return res


api.add_resource(GazeteQuery, '/query')

def get_module_logger(mod_name):
    """
    To use this, do logger = get_module_logger(__name__)
    """
    logger = logging.getLogger(mod_name)
    handler = logging.StreamHandler()
    formatter = logging.Formatter(
        '%(asctime)s [%(name)-12s] %(levelname)-8s %(message)s')
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    logger.setLevel(logging.DEBUG)
    return logger

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=4000)

