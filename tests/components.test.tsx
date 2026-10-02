// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({ href, children, ...p }: { href: string; children: React.ReactNode }) => <a href={href} {...p}>{children}</a>,
}));
vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "x" }) }));

import Landing from "@/app/page";
import Privacy from "@/app/privacy/page";
import { ComplaintForm } from "@/components/ComplaintForm";
import { SubjectsForm } from "@/components/SubjectsForm";
import { VerifyModal } from "@/components/VerifyModal";
import { site } from "@/config/site";

beforeEach(() => {
  vi.stubGlobal("IntersectionObserver", class { observe() {} disconnect() {} });
  HTMLDialogElement.prototype.showModal = function () { this.setAttribute("open", ""); };
  HTMLDialogElement.prototype.close = function () { this.removeAttribute("open"); };
});
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });

const href = (text: string | RegExp) => screen.getByText(text).closest("a")?.getAttribute("href");

describe("landing page", () => {
  it("shows the school's real content and Get Started goes to the care page", () => {
    render(<Landing />);
    expect(screen.getAllByText(site.name).length).toBeGreaterThan(0);
    expect(screen.getByText(site.description)).toBeTruthy();
    for (const link of screen.getAllByText("Get Started")) expect(link.closest("a")?.getAttribute("href")).toBe("/care");
  });
});

describe("Verify modal", () => {
  it("opens with both options and a privacy link", () => {
    render(<VerifyModal />);
    fireEvent.click(screen.getByText("Continue"));
    expect(href("Enter manually")).toBe("/subjects");
    expect(screen.getByText("Verify from school app")).toBeTruthy();
    expect(href("Privacy policy")).toBe("/privacy");
  });
  it("shows loading for 10 seconds, then unavailable with a manual fallback and no success", () => {
    vi.useFakeTimers();
    render(<VerifyModal />);
    fireEvent.click(screen.getByText("Continue"));
    fireEvent.click(screen.getByText("Verify from school app"));
    expect(screen.getByRole("status")).toBeTruthy();
    act(() => { vi.advanceTimersByTime(9000); });
    expect(screen.queryByText(site.appVerify.unavailable)).toBeNull();
    act(() => { vi.advanceTimersByTime(1000); });
    expect(screen.getByText(site.appVerify.unavailable)).toBeTruthy();
    expect(href("Enter manually")).toBe("/subjects");
    expect(screen.queryByText(/verified|success/i)).toBeNull();
  });
});

describe("ComplaintForm", () => {
  const send = (text = "Problem") => {
    const { container } = render(<ComplaintForm />);
    fireEvent.change(screen.getByLabelText("Your complaint"), { target: { value: text } });
    fireEvent.submit(container.querySelector("form")!);
  };
  it("posts the complaint and reveals Verify on success", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });
    vi.stubGlobal("fetch", fetchMock);
    send();
    expect(await screen.findByText("Complaint received")).toBeTruthy();
    expect(fetchMock.mock.calls[0][0]).toBe("/api/complaints");
    expect(screen.getByText("Continue")).toBeTruthy();
  });
  it("shows the server error", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, json: async () => ({ error: "Too many attempts. Try again later." }) }));
    send();
    expect((await screen.findByRole("alert")).textContent).toContain("Too many attempts");
  });
  it("shows a network error", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    send();
    expect((await screen.findByRole("alert")).textContent).toContain("Can't reach the server");
  });
});

describe("SubjectsForm", () => {
  it("shows one input per chosen count and submits them", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });
    vi.stubGlobal("fetch", fetchMock);
    const { container } = render(<SubjectsForm />);
    expect(screen.queryByLabelText("Number of subjects")).toBeNull();
    fireEvent.click(screen.getByLabelText(/JSS 1/));
    fireEvent.change(screen.getByLabelText("Number of subjects"), { target: { value: "15" } });
    const inputs = screen.getAllByLabelText(/^Subject \d+$/);
    expect(inputs).toHaveLength(15);
    inputs.forEach((el, i) => fireEvent.change(el, { target: { value: `Sub${i}` } }));
    fireEvent.submit(container.querySelector("form")!);
    expect(await screen.findByText("Subjects under review")).toBeTruthy();
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.classId).toBe("class-1");
    expect(body.subjects).toHaveLength(15);
  });
  it("links to the privacy policy", () => {
    render(<SubjectsForm />);
    expect(href("Privacy policy")).toBe("/privacy");
  });
});

describe("privacy page", () => {
  it("renders every policy section with real content", () => {
    render(<Privacy />);
    expect(screen.getAllByRole("article")).toHaveLength(site.privacy.length);
    expect(screen.getByText(site.privacy[0].body)).toBeTruthy();
    expect(screen.queryByText(/^\[.*\]$/)).toBeNull();
  });
});
