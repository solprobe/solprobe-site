import { API_SERVICES } from "@/lib/services";
import PayInBrowser from "./PayInBrowser";

export default function ApiServiceGrid() {
  return (
    <section className="api-section" id="services">
      <div className="api-wrap">
        <div className="api-section-label">Services</div>
        <div className="api-services-grid">
          {API_SERVICES.map((svc) => (
            <article
              key={svc.slug}
              className={`api-service-card accent-${svc.accent}`}
            >
              <div className="api-card-top">
                <div>
                  <div className="api-card-id">POST {svc.endpoint}</div>
                  <div className="api-card-name">{svc.name}</div>
                </div>
                <div className="api-card-price">
                  {svc.priceUsd}
                  <span>per call</span>
                </div>
              </div>
              <p className="api-card-desc">{svc.description}</p>
              <div className="api-card-meta">
                <span className="api-tag api-tag-sla">{svc.slaLabel}</span>
                <span className="api-tag api-tag-endpoint">{svc.acpSlug}</span>
              </div>
              <PayInBrowser service={svc} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
