import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminBaseURL } from "../../../constants";
import { useFetch } from "../../../hooks/useFetch";
import "./ProgramSchedule.css";
import { DownloadTableExcel } from "react-export-table-to-excel";

function ProgramSchedule() {
  const { eventId } = useParams();
  const url = `${adminBaseURL}/events/programs/${eventId}`;

  const { data: single, pending: p1 } = useFetch(url, "single");
  const { data: groupe, pending: p2 } = useFetch(url, "groupe");
  const [prog, setProg] = useState([]);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(false);
  const [groupInfo, setGroupInfo] = useState(false);
  const [info, setInfo] = useState('')
  let temp;
  useEffect(() => {
    if (!p1 && !p2) {
      let S = single.map((item) => {
        item.groupe = false;
        item.start_time = convertTime(item.start_time);
        return item;
      });
      let G = groupe.map((item) => {
        item.groupe = true;
        item.start_time = convertTime(item.start_time);
        return item;
      });
      temp = S.concat(G);
      temp.sort((a, b) =>
        a.start_time > b.start_time ? 1 : b.start_time > a.start_time ? -1 : 0
      );
      console.log(temp);
      setProg([...temp]);
    }
  }, [p1, p2]);

  const viewProgramDetails = (e) => {
    const id = e.target.closest("[data-id]").dataset.id;
    const isGroupe = e.target.closest("[data-groupe]").dataset.groupe;
    console.log(isGroupe);
    if (isGroupe == "true") {
      navigate(`/admin/programs/groupe/${id}`);
    } else {
      navigate(`/admin/programs/single/${id}`);
    }
  };

  const convertTime = (time) => {
    var timeSplit = time.split(":"),
      hours,
      minutes,
      meridian;
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
      meridian = "PM";
      hours -= 12;
    } else if (hours < 12) {
      meridian = "AM";
      if (hours == 0) {
        hours = 12;
      }
    } else {
      meridian = "PM";
    }
    return hours + ":" + minutes + " " + meridian;
  };
  const tableRef1 = useRef(null);
  const tableRef2 = useRef(null);

  const viewGroupe = (outerIndex, index) => {
    console.log(prog[outerIndex].groups[index]);
    setInfo(prog[outerIndex].groups[index])
    setGroupInfo(true)
  };

  const viewParticipant = (outerIndex, index) => {
    console.log(prog[outerIndex].participants[index]);
    setInfo(prog[outerIndex].participants[index])
    setUserInfo(true)
  };

  return (
    <div className="scheduler">
      <h2>PROGRAM SCHEDULE</h2>

      <div className="scheduled-card">
        <h4>ON-STAGE</h4>
        <table cellSpacing={0} ref={tableRef1}>
          <tr>
            <th rowSpan={2}>Program</th>
            <th rowSpan={2}>Time</th>
            <th colSpan={2}>Participants</th>
          </tr>
          <tr>
            <td>NAME</td>
            <td>HOUSE</td>
          </tr>
          {prog.map((program, outerIndex) => {
            if (program.type === "on-stage")
              return (
                <>
                  <tr key={outerIndex}>
                    <td
                      data-id={program._id}
                      data-groupe={program.groupe}
                      data-index={outerIndex}
                      onClick={viewProgramDetails}
                      className="program"
                      rowSpan={
                        program.groupe
                          ? program.groups.length == 0
                            ? false
                            : program.groups.length
                          : program.participants.length == 0
                          ? false
                          : program.participants.length
                      }
                    >
                      {program.program_name}
                    </td>
                    <td
                      rowSpan={
                        program.groupe
                          ? program.groups.length == 0
                            ? false
                            : program.groups.length
                          : program.participants.length == 0
                          ? false
                          : program.participants.length
                      }
                      className="time"
                    >
                      {program.start_time}
                    </td>
                    {program.groupe ? (
                      program.groups.length == 0 ? (
                        <>
                          <td>N/A</td>
                          <td>N/A</td>
                        </>
                      ) : (
                        <>
                          <td
                            className="name"
                            onClick={() => viewGroupe(outerIndex, 0)}
                          >
                            {program.groups[0].group_name}
                          </td>
                          <td>{program.groups[0].house}</td>
                        </>
                      )
                    ) : program.participants.length == 0 ? (
                      <>
                        <td>N/A</td>
                        <td>N/A</td>
                      </>
                    ) : (
                      <>
                        <td
                          className="name"
                          onClick={() => viewParticipant(outerIndex, 0)}
                        >
                          {program.participants[0].name}
                        </td>
                        <td>{program.participants[0].house}</td>
                      </>
                    )}
                  </tr>
                  {program.groupe
                    ? program.groups.map((group, index) =>
                        index != 0 ? (
                          <tr>
                            <td
                              className="name"
                              onClick={() => viewGroupe(outerIndex, index)}
                            >
                              {group.group_name}
                            </td>
                            <td>{group.house}</td>
                          </tr>
                        ) : (
                          ""
                        )
                      )
                    : program.participants.map((user, index) =>
                        index != 0 ? (
                          <tr>
                            <td
                              className="name"
                              onClick={() => viewParticipant(outerIndex, index)}
                            >
                              {user.name}
                            </td>
                            <td>{user.house}</td>
                          </tr>
                        ) : (
                          ""
                        )
                      )}
                </>
              );
          })}
        </table>
        <DownloadTableExcel
          filename="users table"
          sheet="users"
          currentTableRef={tableRef1.current}
        >
          <button> Export excel </button>
        </DownloadTableExcel>

        <h4 style={{ marginTop: "1rem" }}>OFF-STAGE</h4>
        <table cellSpacing={0} ref={tableRef2}>
          <tr>
            <th rowSpan={2}>Program</th>
            <th rowSpan={2}>Time</th>
            <th colSpan={2}>Participants</th>
          </tr>
          <tr>
            <td>NAME</td>
            <td>HOUSE</td>
          </tr>
          {prog.map((program, outerIndex) => {
            if (program.type === "off-stage")
              return (
                <>
                  <tr key={outerIndex}>
                    <td
                      data-id={program._id}
                      data-groupe={program.groupe}
                      data-index={outerIndex}
                      onClick={viewProgramDetails}
                      className="program"
                      rowSpan={
                        program.groupe
                          ? program.groups.length == 0
                            ? false
                            : program.groups.length
                          : program.participants.length == 0
                          ? false
                          : program.participants.length
                      }
                    >
                      {program.program_name}
                    </td>
                    <td
                      rowSpan={
                        program.groupe
                          ? program.groups.length == 0
                            ? false
                            : program.groups.length
                          : program.participants.length == 0
                          ? false
                          : program.participants.length
                      }
                      className="time"
                    >
                      {program.start_time}
                    </td>
                    {program.groupe ? (
                      program.groups.length == 0 ? (
                        <>
                          <td>N/A</td>
                          <td>N/A</td>
                        </>
                      ) : (
                        <>
                          <td
                            className="name"
                            onClick={() => viewGroupe(outerIndex, 0)}
                          >
                            {program.groups[0].group_name}
                          </td>
                          <td>{program.groups[0].house}</td>
                        </>
                      )
                    ) : program.participants.length == 0 ? (
                      <>
                        <td>N/A</td>
                        <td>N/A</td>
                      </>
                    ) : (
                      <>
                        <td
                          className="name"
                          onClick={() => viewParticipant(outerIndex, 0)}
                        >
                          {program.participants[0].name}
                        </td>
                        <td>{program.participants[0].house}</td>
                      </>
                    )}
                  </tr>
                  {program.groupe
                    ? program.groups.map((group, index) =>
                        index != 0 ? (
                          <tr>
                            <td
                              className="name"
                              onClick={() => viewGroupe(outerIndex, index)}
                            >
                              {group.group_name}
                            </td>
                            <td>{group.house}</td>
                          </tr>
                        ) : (
                          ""
                        )
                      )
                    : program.participants.map((user, index) =>
                        index != 0 ? (
                          <tr>
                            <td
                              className="name"
                              onClick={() => viewParticipant(outerIndex, index)}
                            >
                              {user.name}
                            </td>
                            <td>{user.house}</td>
                          </tr>
                        ) : (
                          ""
                        )
                      )}
                </>
              );
          })}
        </table>
        <DownloadTableExcel
          filename="users table"
          sheet="users"
          currentTableRef={tableRef2.current}
        >
          <button> Export excel </button>
        </DownloadTableExcel>
      </div>
      {/* EDIT HEAR */}
{  groupInfo && <div className="wrapper">
          <div className="info-card-group">
            <h1>{info.group_name}</h1>
            <p>House : <span>{info.house}</span></p>
            <h2>Participants</h2>
            <div>
              <h3>Leader</h3>
              <div className="info-group-participant">
                <p>Name : <span>{info.head_id.name}</span></p>
                <p>Admisson No : <span>{info.head_id.adm_no}</span></p>
              </div>
              <h3>Participants</h3>
              {info.members.map((participant , index)=>{
                return ( <div className="info-group-participant">
                  <p>Name : <span>{participant.name}</span></p>
                  <p>Admission No : <span>{participant.adm_no}</span></p>
                </div> )
              })}
            </div>

          </div>
          <button onClick={()=>setGroupInfo(false)}>cancel</button>
      </div>}
      {  userInfo && <div className="wrapper">
          <div className="info-card">
            <h1>{info.name}</h1>
            <div>
              <p>Chest no : <span>{info.chestNo}</span></p>
              <p>Admission no: <span>{info.adm_no}</span></p>
              <p>House : <span>{info.house}</span></p>
            </div>
          </div>
          <button onClick={()=>setUserInfo(false)}>cancel</button>
      </div>}
    </div>
  );
}

export default ProgramSchedule;
