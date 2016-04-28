﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Configuration;

public partial class meetingManage_MeetingInfo : System.Web.UI.Page
{
    public string Titles = "";
    public string Types = "";
    public string Expenditure = "";
    public string StartTime = "";
    public string FinishTime = "";
    public string MeetingContent = "";
    public string addTime = "";
    public string UserName = "";
    public string BoardroomName = "";
    public string Personnel = "";
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {


            int Meetingid = Convert.ToInt32(Request["Meetingid"].ToString());
            SqlConnection con = new SqlConnection(ConfigurationManager.AppSettings["Connection"]);
            con.Open();
            string sql = "select * from MyMeeting where Meetingid=" + Meetingid + "";
            SqlCommand com = new SqlCommand(sql, con);
            SqlDataReader dr = com.ExecuteReader();
            if (dr.Read())
            {
                Personnel = dr["Personnel"].ToString();
                Titles = dr["title"].ToString();
                Types = dr["Type"].ToString();
                Expenditure = dr["Expenditure"].ToString();
                StartTime = dr["StartTime"].ToString();
                FinishTime = dr["FinishTime"].ToString();
                MeetingContent = dr["MeetingContent"].ToString();
                addTime = dr["addTime"].ToString();
                UserName = SelectName();
                BoardroomName = dr["BoardroomName"].ToString();
            }
            con.Close();
        }


    }
    public string SelectName()
    {
        int Meetingid = Convert.ToInt32(Request["Meetingid"].ToString());
        SqlConnection con = new SqlConnection(ConfigurationManager.AppSettings["Connection"]);
        con.Open();
        string sql = "select Name from Employee where UserName=(select username  from Meeting where Meetingid=" + Meetingid + "  )";
        SqlCommand com = new SqlCommand(sql, con);
        SqlDataReader dr = com.ExecuteReader();
        dr.Read();
        string Name = dr.GetValue(0).ToString();
        return Name;

    }
}