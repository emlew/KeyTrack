import { BigStatistic, HourDrawer, Table } from "@/components";
import { StyledButtonRow, StyledContent, StyledStatsRow } from "./Hours.styles";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { AddRounded, DownloadRounded } from "@mui/icons-material";
import { useState } from "react";
import {
  useDrawer,
  useGenerateReport,
  useHoursData,
  useUserData,
} from "@/hooks";
import dayjs from "dayjs";

const filterOptions = ["All Hours", "Approved Hours", "Unapproved Hours"];

const accumulateHours = (hours: any[] | null | undefined) => {
  if (!hours || hours.length == 0) return 0;
  return hours.map((h) => h.hours).reduce((a, b) => a + b);
};

export const Hours: React.FC = () => {
  const { openDrawer } = useDrawer();
  const [filter, setFilter] = useState("All Hours");
  const { data: hours, isLoading } = useHoursData();
  const generate = useGenerateReport();
  const { data: user } = useUserData();

  return (
    <StyledContent>
      <StyledStatsRow>
        <BigStatistic text="Total Hours" value={accumulateHours(hours)} />
        <BigStatistic
          text="Approved Hours"
          value={accumulateHours(hours?.filter((h) => h.is_approved))}
        />
        <BigStatistic
          text="Hours from Key Club Events"
          value={accumulateHours(hours?.filter((h) => h.has_event))}
        />
        <BigStatistic
          text="Hours from Outside Events"
          value={accumulateHours(hours?.filter((h) => !h.has_event))}
        />
      </StyledStatsRow>
      <StyledButtonRow>
        <Box sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <Button
            variant="contained"
            endIcon={<AddRounded />}
            onClick={() => openDrawer(<HourDrawer />)}
          >
            Log Hours
          </Button>
          <Button
            variant="contained"
            endIcon={<DownloadRounded />}
            onClick={() =>
              generate(
                user.email ?? "",
                hours?.filter((h) => h.is_approved) ?? []
              )
            }
          >
            Generate Report
          </Button>
        </Box>
        <FormControl id="filter-label" size="small">
          <InputLabel id="filter-label">Hours</InputLabel>
          <Select
            labelId="filter-label"
            id="filter"
            value={filter}
            label="Filter"
            onChange={(event) => setFilter(event.target.value)}
          >
            {filterOptions.map((o) => (
              <MenuItem key={o} value={o}>
                {o}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </StyledButtonRow>
      <Table
        columnNames={["Hours", "Date", "Key Club Event"]}
        isEmpty={hours?.length == 0}
        isLoading={isLoading}
      >
        <TableBody>
          {hours &&
            hours
              .filter((h) => {
                if (filter === "Approved Hours") {
                  return h.is_approved;
                }
                if (filter === "Unapproved Hours") {
                  return !h.is_approved;
                }
                return true;
              })
              .sort((a, b) => dayjs(b.date_completed).diff(a.date_completed))
              .map((h) => (
                <TableRow key={h.id}>
                  <TableCell component="th" scope="row">
                    {h.hours}
                  </TableCell>
                  <TableCell align="right">
                    {dayjs(h.date_completed).format("MM/DD/YYYY")}
                  </TableCell>
                  <TableCell align="right">
                    {h.has_event && h.events ? h.events.name : ""}
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </StyledContent>
  );
};
