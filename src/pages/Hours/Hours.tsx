import { BigStatistic, Table } from "@/components";
import { StyledButtonRow, StyledContent, StyledStatsRow } from "./Hours.styles";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { AddRounded } from "@mui/icons-material";
import { useState } from "react";
import { mockHours } from "@/utils";

const filterOptions = ["All Hours", "Approved Hours", "Unapproved Hours"];

export const Hours: React.FC = () => {
  const [filter, setFilter] = useState("All Hours");

  return (
    <StyledContent>
      <StyledStatsRow>
        <BigStatistic
          text="Total Hours"
          value={
            mockHours.length > 0
              ? mockHours.map((h) => h.hours).reduce((a, b) => a + b)
              : 0
          }
        />
        <BigStatistic
          text="Approved Hours"
          value={
            mockHours.filter((h) => h.is_approved).length > 0
              ? mockHours
                  .filter((h) => h.is_approved)
                  ?.map((h) => h.hours)
                  .reduce((a, b) => a + b)
              : 0
          }
        />
        <BigStatistic
          text="Hours from Key Club Events"
          value={
            mockHours.filter((h) => h.has_event).length > 0
              ? mockHours
                  .filter((h) => h.has_event)
                  ?.map((h) => h.hours)
                  .reduce((a, b) => a + b)
              : 0
          }
        />
        <BigStatistic
          text="Hours from Outside Events"
          value={
            mockHours.filter((h) => !h.has_event).length > 0
              ? mockHours
                  .filter((h) => !h.has_event)
                  ?.map((h) => h.hours)
                  .reduce((a, b) => a + b)
              : 0
          }
        />
      </StyledStatsRow>
      <StyledButtonRow>
        <Button variant="contained" endIcon={<AddRounded />}>
          Log Hours
        </Button>
        <FormControl id="filter-label" size="small">
          <InputLabel id="filter-label">Hours</InputLabel>
          <Select
            labelId="filter-label"
            id="filter"
            value={filter}
            label="Filter"
            onChange={(event) => setFilter(event.target.value)}
          >
            {filterOptions.map((m) => (
              <MenuItem key={m} value={m}>
                {m}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </StyledButtonRow>
      <Table
        columnNames={["Hours", "Date", "Key Club Event"]}
        isEmpty={mockHours.length == 0}
      >
        <TableBody>
          {mockHours &&
            mockHours
              .filter((h) => {
                if (filter === "Approved Hours") {
                  return h.is_approved;
                }
                if (filter === "Unapproved Hours") {
                  return !h.is_approved;
                }
                return true;
              })
              .map((h) => (
                <TableRow key={h.id}>
                  <TableCell component="th" scope="row">
                    {h.hours}
                  </TableCell>
                  <TableCell align="right">{h.date_completed}</TableCell>
                  <TableCell align="right">
                    {h.has_event ? h.event_id : ""}
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </StyledContent>
  );
};
